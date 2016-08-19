/**
 * This class handles the SQL parsing for the Create Statements and associates the correct class to perform the final deed.
 * @author Prashant
 */
function CreateController () {
	
};

CreateController.CREATE = ParseController.CREATE;

/**
 * Executes the Create Statement.
 * //Not doing the create DB right now
 */
CreateController.prototype.execute = function (prm_sSQL) {
	let v_Return;
	let v_fnExecute;
	try {
		v_fnExecute = new CreateFuncExecute();
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
