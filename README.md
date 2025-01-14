# LayX Extension for VS Code

The LayX Extension is a Visual Studio Code tool designed to enhance your workflow with the [LayX framework](https://github.com/arif891/layx), a modern CSS framework for flexible and responsive layouts.

## Features

- **Component Synchronization**: Automatically sync HTML elements with matching `data-component` attributes across multiple files, ensuring consistency throughout your project.
- **Backup Creation**: Optionally create backups of files before modifications to safeguard your data.
- **Progress Indication**: Visual feedback during the synchronization process to keep you informed of the operation's status.
- **Detailed Logging**: Comprehensive logs to help you monitor actions and troubleshoot issues effectively.

*Stay tuned for upcoming features aimed at further enhancing your development experience with LayX.*

## Requirements

- **Visual Studio Code**: Version 1.96.0 or higher
- **File Encoding**: Ensure all files are encoded in UTF-8

## Extension Settings

- `layx.createBackups`: Enable or disable the creation of backup files before synchronization.

## Usage

1. **Open Command Palette**: Press `Ctrl`+`Shift`+`P` (or `Cmd`+`Shift`+`P` on macOS) to open the command palette.
2. **Initiate Sync**: Type "Sync Components" and select the command from the list.
3. **Automatic Synchronization**: The extension will identify and sync all matching elements across your HTML files.

## Contributing

We welcome contributions to enhance the functionality of this extension. To contribute:

1. **Fork the Repository**: Create a personal copy of the repository.
2. **Create a Feature Branch**: Develop your feature or fix in a dedicated branch.
3. **Submit a Pull Request**: Propose your changes for review and integration.

For more details, refer to the [LayX Contributing Guide](https://layx.xyz/pages/docs/about/contributing.html).

## License

This project is licensed under the MIT License.