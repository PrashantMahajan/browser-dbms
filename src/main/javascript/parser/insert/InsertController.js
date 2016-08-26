/**
 * This class handles the SQL parsing for the Insert Statements and associates the correct class to perform the final deed.
 * @author Prashant
 */
function InsertController () {
	
};

InsertController.INSERT = ParseController.INSERT;
InsertController.INTO = "into";

/**
 * Executes the Insert Statement.
 */
InsertController.prototype.execute = function (prm_sSQL) {
	let v_Return;
	let v_fnExecute;
	try {
		v_fnExecute = new InsertFuncExecute();
		v_fnExecute.setController(this);
		v_fnExecute.setQuery(prm_sSQL);
		v_fnExecute.startFunction ();
		v_Return = v_fnExecute.getResult();
	} catch (v_exException) {
		if (console) {
			console.log(v_exException);			
		}
	}
	return v_Return;
};

/**
 * Internal Functioncall to find the Data in the sql query
 */
InsertController.prototype.findTheDataInSQL = function (prm_sSQL, prm_sParsedSQL) {
	let v_Return;
	let v_fnExecute;
	try {
		v_fnExecute = new InsertFuncFindTheDataInSQL();
		v_fnExecute.setController(this);
		v_fnExecute.setQuery(prm_sSQL);
		v_fnExecute.setParsedSQL(prm_sParsedSQL);
		v_fnExecute.startFunction();
		v_Return = v_fnExecute.getResult();
	} catch (v_exException) {
		if (console) {
			console.log(v_exException);			
		}
	}
};

InsertController.prototype.trim = function (prm_sString) {
	if (null == prm_sString) {
		return null;
	} else {
		return ("" + prm_sString).replace(/^\s+|\s+$/gm, '');
	}
};

InsertController.prototype.log = function (prm_sMesssage) {
	if (console) {
		console.log(prm_sMesssage);
	}
};
