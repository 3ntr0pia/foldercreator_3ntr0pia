import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand(
		'folderCreator.createFolders',
		async (uri: vscode.Uri) => {
			const folderNames = [
				'Config',
				'Components',
				'Interfaces',
				'Services',
				'Helpers',
				'Environments',
				'Shared',
				'Global',
				'Assets',
				'Models',
				'Routes',
				'Views',
				'Directives',
				'Pipes',
				'Styles',
				'Scripts',
			];

			const selectedFolders = await vscode.window.showQuickPick(folderNames, {
				canPickMany: true,
				placeHolder: 'Selecciona las carpetas que deseas crear - Select the folders you want to create',
			});

			if (selectedFolders && selectedFolders.length > 0) {
				const targetPath = uri.fsPath; 

				selectedFolders.forEach((folder) => {
					const folderPath = path.join(targetPath, folder);
					if (!fs.existsSync(folderPath)) {
						fs.mkdirSync(folderPath);
					}
				});

				vscode.window.showInformationMessage('Folders created successfully! - Carpetas creadas con éxito!');
			} else {
				vscode.window.showInformationMessage(
					'No folder was selected. - No se seleccionó ninguna carpeta.'
				);
			}
		}
	);

	context.subscriptions.push(disposable);
}
