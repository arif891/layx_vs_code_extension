const vscode = require('vscode');
const fs = require('fs/promises');

function activate(context) {
    try {

        let syncDisposable = vscode.commands.registerCommand('extension.syncElement', async () => {
            try {
                const editor = vscode.window.activeTextEditor;
                if (!editor) {
                    throw new Error('No active editor found.');
                }

                const document = editor.document;
                const text = document.getText();
                const elements = parseElements(text);

                if (Object.keys(elements).length === 0) {
                    throw new Error('No elements with data-component found.');
                }

                await syncElementsToFiles(elements, document.uri);
                vscode.window.showInformationMessage('Elements synced successfully.');
            } catch (error) {
                vscode.window.showErrorMessage(`Sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        });

        context.subscriptions.push(syncDisposable);
        console.info('LayX extension activated successfully');
    } catch (error) {
        console.error('Failed to activate extension', error);
        throw error;
    }
}

async function syncElementsToFiles(elements, sourceUri) {
    const htmlFiles = await vscode.workspace.findFiles('**/*.html');
    const config = vscode.workspace.getConfiguration('layx');
    const createBackups = config.get('createBackups', false);

    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: "Syncing elements",
        cancellable: true
    }, async (progress, token) => {
        for (const file of htmlFiles) {
            if (token.isCancellationRequested) {
                break;
            }
            if (file.fsPath === sourceUri.fsPath) {
                continue;
            }

            try {
                const fileContent = await fs.readFile(file.fsPath, 'utf8');
                
                if (createBackups) {
                    await createBackup(file.fsPath, fileContent);
                }

                const updatedContent = updateFileContent(fileContent, elements);
                await fs.writeFile(file.fsPath, updatedContent, 'utf8');
                progress.report({ increment: 100 / htmlFiles.length });
            } catch (error) {
                console.error(`Failed to process ${file.fsPath}:`, error);
            }
        }
    });
}

function parseElements(text) {
    const elements = {};
    const regex = /<(\w+)[^>]*data-component="([^"]+)"[^>]*>([\s\S]*?)<\/\1>/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
        elements[match[2]] = match[0];
    }
    return elements;
}

async function createBackup(filePath, content) {
    const backupPath = `${filePath}.backup`;
    await fs.writeFile(backupPath, content, 'utf8');
    return backupPath;
}

function updateFileContent(content, elements) {
    let updatedContent = content;
    for (const [component, element] of Object.entries(elements)) {
        const componentRegex = new RegExp(
            `<(\\w+)[^>]*data-component="${component}"[^>]*>([\\s\\S]*?)<\\/\\1>`,
            'g'
        );
        updatedContent = updatedContent.replace(componentRegex, element);
    }
    return updatedContent;
}

module.exports = {
    activate,
    parseElements,
    updateFileContent
};