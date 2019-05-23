import ModuleBundler from "../module_bundler/ModuleBundler";

/**
 * 
 */
export default class Core {

	/**
	 * 
	 */
	private moduleBundler: ModuleBundler = new ModuleBundler();

	/**
	 * 
	 */
	public constructor() {
		this.initModules();

		// Test
		setInterval(async () => {
			console.log("Updating modules");
			this.updateModules();
		}, 5000)
	}
	
	/**
	 * 
	 */
	private async initModules(): Promise<void> {
		const modules = await this.moduleBundler.bundleModules();
		modules.forEach(_module => _module.entry());
	}

	/**
	 * 
	 */
	private async updateModules(): Promise<void> {
		const newModules = await this.moduleBundler.updateModules();
		newModules.forEach(_module => _module.entry());
	}
}