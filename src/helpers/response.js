import Connection from '../connection/db.js';
import {successObj, errorObj} from './responseObjects.js';

const response = (res, tran = false, prom, ...values) => {
    const cn = new Connection(tran);
    prom(cn, ...values)
        .then(result => success(res, cn, result))
        .catch(error => fail(res, cn, error))
};

const success = async (res, cn, result = []) => {
    cn.close();
    res.json(successObj(result, 'SUCCESS'));
};

const fail = (res, cn, error) => {
    console.log(error);
    cn.close();
    res.json(errorObj(error));
};

export default response;