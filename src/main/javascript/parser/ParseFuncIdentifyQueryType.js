/**
 * This class tells what type of Query is being executed
 * @author prashantmahajan 
 */
function ParseFuncIdentifyQueryType () {
	this.g_sReturn = "";
	this.g_sSQL;
}

/**
 * Returns the Result
 */
ParseFuncIdentifyQueryType.prototype.getResult = function () {
	return this.g_sReturn;
};

/**
 * Sets the Query String 
 */
ParseFuncIdentifyQueryType.prototype.setQuery = function (prm_sSQL) {
	this.g_sSQL = ("" + prm_sSQL).replace(/^\s+|\s+$/gm, '');
};

/**
 * Executes the Function Call
 */
ParseFuncIdentifyQueryType.prototype.startFunction = function () {
	try {
		if ("" == this.g_sSQL) {
		} else if (0 == this.g_sSQL.toLowerCase().indexOf(ParseController.SELECT)) {
			this.g_sReturn = ParseController.SELECT;
		} else if (0 == this.g_sSQL.toLowerCase().indexOf(ParseController.DELETE)) {
			this.g_sReturn = ParseController.DELETE;
		} else if (0 == this.g_sSQL.toLowerCase().indexOf(ParseController.INSERT)) {
			this.g_sReturn = ParseController.INSERT;
		} else if (0 == this.g_sSQL.toLowerCase().indexOf(ParseController.UPDATE)) {
			this.g_sReturn = ParseController.UPDATE;
		} else if (0 == this.g_sSQL.toLowerCase().indexOf(ParseController.CREATE)) {
			this.g_sReturn = ParseController.CREATE;
		}
	} catch (v_exException) {
		if (console) {
			console.log(v_exException);			
		}
	}
};
