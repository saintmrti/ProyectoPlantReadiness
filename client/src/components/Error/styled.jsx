import styled from 'styled-components';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Icon = styled(SentimentVeryDissatisfiedIcon)`
    margin-top: 200px;
    font-size: 200px;
    color: #757575;
`;

export const Title = styled.div`
    margin: 10px 0px;
    font-size: 24px;
    color: #9E9E9E;
`;

export const Text = styled.div`
    margin: 10px 0px;
    font-size: 16px;
    color: #757575;
    width: 50%;
    text-align: center;
`;