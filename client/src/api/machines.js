import axios, { CancelToken } from 'axios';

export const fetchMachinesApi = {
    cancel: null,
    run: () => (
        axios.get('/api/maquinas', {
            cancelToken: new CancelToken(c => fetchMachinesApi.cancel = c),
        })
        .then(({ data }) => data)
    )
};
