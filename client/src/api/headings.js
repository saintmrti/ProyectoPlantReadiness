import axios, { CancelToken } from 'axios';

export const fetchHeadingsApi = {
    cancel: null,
    run: () => (
        axios.get('/api/rubros', {
            cancelToken: new CancelToken(c => fetchHeadingsApi.cancel = c),
        })
        .then(({ data }) => data)
    )
};
