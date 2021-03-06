import transactions, {actions} from "./transactions-reducer";

const state = {
    transactions: [
        {
            "userid": "brayman",
            "date": "2022-05-13T00:00:00.000Z",
            "cardid": "9c46e85e-2de5-4eaf-8877-1f7ad224f1af",
            "cost": 1,
            "payee": "yandex.taxi",
            "tag": "taxi",
            "id": "cd7d0489-3337-4492-acdb-630d3fa6c76d"
        },
        {
            "userid": "brayman",
            "date": "2022-05-13T00:00:00.000Z",
            "cardid": "9c46e85e-2de5-4eaf-8877-1f7ad224f1af",
            "cost": 10,
            "payee": "yandex.taxi",
            "tag": "deliver",
            "id": "d1a180d9-7d19-417a-a3af-875feae01596"
        },
        {
            "userid": "brayman",
            "date": "2022-05-13T00:00:00.000Z",
            "cardid": "9c46e85e-2de5-4eaf-8877-1f7ad224f1af",
            "cost": 10,
            "payee": "yammy",
            "tag": "shop",
            "id": "311f19f0-bdcc-466e-ac2c-bdd007b84add"
        },
        {
            "userid": "brayman",
            "date": "2022-05-13T00:00:00.000Z",
            "cardid": "9c46e85e-2de5-4eaf-8877-1f7ad224f1af",
            "cost": 10,
            "payee": "yammy",
            "tag": "shop",
            "id": "ef8468a7-4c02-4b02-8a02-407fa334be60"
        },
        {
            "userid": "brayman",
            "date": "2022-05-13T00:00:00.000Z",
            "cardid": "9c46e85e-2de5-4eaf-8877-1f7ad224f1af",
            "cost": 10,
            "payee": "test",
            "tag": "bus",
            "id": "72bb6498-6018-436b-9e7c-2ffe2ff752fe"
        },
        {
            "userid": "brayman",
            "date": "2022-05-13T00:00:00.000Z",
            "cardid": "9c46e85e-2de5-4eaf-8877-1f7ad224f1af",
            "cost": 11,
            "payee": "yandex.taxi",
            "tag": "bus",
            "id": "142dbba3-066d-465e-82ca-de38acb1a755"
        },
        {
            "userid": "brayman",
            "date": "2022-05-13T00:00:00.000Z",
            "cardid": "9c46e85e-2de5-4eaf-8877-1f7ad224f1af",
            "cost": 10,
            "payee": "yandex.taxi",
            "tag": "",
            "id": "eef31c20-d54a-4942-8da4-b9194ed4dd0b"
        },
        {
            "userid": "brayman",
            "date": "2022-05-13T00:00:00.000Z",
            "cardid": "9c46e85e-2de5-4eaf-8877-1f7ad224f1af",
            "cost": 1,
            "payee": "1",
            "tag": "",
            "id": "3bd3f20d-7cbd-40be-8a05-23a835eb7889"
        },
        {
            "userid": "brayman",
            "date": "2022-05-13T00:00:00.000Z",
            "cardid": "9c46e85e-2de5-4eaf-8877-1f7ad224f1af",
            "cost": 10,
            "payee": "yandex.taxi",
            "tag": "",
            "id": "cdbda54e-6d2b-4e97-9fc7-98a8b42dd37e"
        }
    ]
}
const newTransaction = {
    id: "82d33abe-f182-4c92-bccf-341fb475f9c0",
    userid: "TestUser",
    date: "2022-06-24T00:00:00.000Z",
    cardid: "bf800890-48df-478b-b27d-ed974658cd12",
    card: "testCard",
    cost: 90,
    payee: "test payee",
    tag: "test",
    type: "income",
    currency: "USD"
}

it('length transactions should be increment and to be new transaction', () => {
    // 1 test data


    const action = actions.addTransaction(newTransaction)

    // 2 action
    const newState = transactions(state, action);

    // 3 expection

    expect(newState.transactions.length).toBe(10)
    expect(newState.transactions).toEqual(expect.arrayContaining([newTransaction]))
})

it('length after deleting transactions should be decrement', () => {
    // 1 test date
    const action = actions.deleteTransaction(state.transactions[2].id)

    // 2 action
    const newState = transactions(state, action);
    // 3 expection

    expect(newState.transactions.length).toBe(8)
    expect(newState.transactions).toEqual(expect.not.arrayContaining([state.transactions[2]]))
})
