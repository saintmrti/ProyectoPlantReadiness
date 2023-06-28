import _ from 'lodash';

export const successObj = (data, status) => ({
    isError: false, 
    isEmpty: _.isEmpty(data), 
    data, 
    status,
});

export const errorObj = status => ({
    isError: true, 
    status,
});