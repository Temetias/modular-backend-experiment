import { lstatSync, readdirSync } from "fs";
import { join } from "path";
import Module from "./Module";

/**
 * 
 */
export default class ModuleBundler {

	/**
	 * 
	 */
	private readonly modulesFolder = join(__dirname, "../../../modules");

	/**
	 * 
	 */
	private readonly modules: Module[] = [];

	/**
	 * 
	 */
	public constructor() {

	}


	/**
	 * 
	 */
	public async bundleModules(): Promise<Module[]> {
		const modulesQue = this.getModuleFolders()
			.map(async moduleFolder => await this.buildModule(moduleFolder))
		;
		const modules = await Promise.all(modulesQue);
		modules.map(_module => this.modules.push(_module));
		return this.modules; 
	}

	/**
	 * 
	 */
	public async updateModules(): Promise<Module[]> {
		const modulesQue = this.getModuleFolders()
			.map(async moduleFolder => await this.buildModule(moduleFolder))
		;
		const modules = await Promise.all(modulesQue);
		const newModules: Module[] = [] 
		modules.forEach(_module => {
			if (!this.modules.some(__module => __module.location === _module.location)) {
				this.modules.push(_module);
				newModules.push(_module);
			}
		});
		return newModules; 
	}

	/**
	 * 
	 */
	private async buildModule(moduleFolder: string): Promise<Module> {
		const _module = await import(join(moduleFolder, "/src/main"));
		return new Module(moduleFolder, _module.default);
	}

	/**
	 * 
	 */
	private getModuleFolders(): string[] {
		const isDirectory = (source: string) => lstatSync(source).isDirectory();
		return readdirSync(this.modulesFolder)
			.map(name => join(this.modulesFolder, name))
			.filter(isDirectory)
		;
	}
}