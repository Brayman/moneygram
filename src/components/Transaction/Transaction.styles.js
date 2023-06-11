import styled from "styled-components";

export const Header = styled.div`
    background-color: ${({ type }) => {

        switch (type) {
            case 'expense':
                return 'var(--red-100)'
            case 'income':
                return 'var(--green-100)'
            case 'transfer':
                return 'var(--blue-100)'
            default:
                return 'var(--velvet-100)'
        }
    }};
    color: var(--light-80);
    padding-bottom: 48px;
`

export const Title = styled.div`
    font-weight: 700;
    font-size: 48px;
    line-height: 80px;
    text-align: center;
`

export const DateString = styled.div`
    font-size: 13px;
    line-height: 18px;
    font-weight: 400;
    opacity: 0.88;
    text-align: center;
`
