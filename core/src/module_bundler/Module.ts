
/**
 * 
 */
export default class Module {

	/**
	 * 
	 */
	public location: string; 

	/**
	 * 
	 */
	public entry: () => void;

	/**
	 * 
	 */
	public constructor(location: string, entry: () => void) {
		this.location = location;
		this.entry = entry;
	}
}