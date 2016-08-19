/**
 * This class handles the SQL parsing and associates the correct class to perform the final deed.
 * @author Prashant
 */
function ParseController () {
}
ParseController.INSERT = "insert";
ParseController.DELETE = "delete";
ParseController.UPDATE = "update";
ParseController.SELECT = "select";
ParseController.CREATE = "create";
/**
 * Statics/Constants
 */
ParseController.TYPE_OF_QUERIES_SUPPORTED = [ParseController.INSERT, ParseController.DELETE, ParseController.UPDATE, ParseController.SELECT, ParseController.CREATE];

/**
 * Executes the SQL Query 
 */
/*JSON*/ParseController.prototype.execute = function (prm_sSQL) {
	let v_Return;
	let v_fnParseFuncExecute;
	try {
		v_fnParseFuncExecute = new ParseFuncExecute();
		v_fnParseFuncExecute.setController(this);
		v_fnParseFuncExecute.setQuery(prm_sSQL);
		v_fnParseFuncExecute.startFunction ();
		v_Return = v_fnParseFuncExecute.getResult();
	} catch (v_exException) {
		if (console) {
			console.log(v_exException);			
		}
	}
	return v_Return;
};

/**
 * Identifies the Type of the Query and return the type.
 */
/*String*/ ParseController.prototype.identifyQueryType = function (prm_sSQL) {
	let v_sReturn;
	let v_fnParseFuncIdentifyQueryType;
	try {
		v_fnParseFuncIdentifyQueryType = new ParseFuncIdentifyQueryType();
		v_fnParseFuncIdentifyQueryType.setQuery(prm_sSQL);
		v_fnParseFuncIdentifyQueryType.startFunction();
		v_sReturn = v_fnParseFuncIdentifyQueryType.getResult();
	} catch (v_exException) {
		if (console) {
			console.log(v_exException);			
		}
	}
	return v_sReturn;
};
