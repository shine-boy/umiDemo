import { getList, addList, updateList,deleteListById } from '../services/card';  // request 是 demo 项目脚手架中提供的一个做 http 请求的方法，是对于 fetch 的封装，返回 Promise

export default {
    namespace: 'table',
    state: {
        data: [
            // {
            //   id: 1,
            //   setup: 'Did you hear about the two silk worms in a race?',
            //   punchline: 'It ended in a tie',
            // },
            // {
            //   id: 2,
            //   setup: 'What happens to a frog\'s car when it breaks down?',
            //   punchline: 'It gets toad away',
            // },
        ],
        counter: 100,
    },
    reducers: {
        getList(state, { payload: d }) {
            return {
                data: d,

            };
        }
    },
    effects: {
        //获得数据
        *queryInitCards({ payload }, sagaEffects) {
            const { call, put } = sagaEffects;


            const puzzle = yield call(getList);

            yield put({ type: 'getList', payload: puzzle });
        },
        *addInitCards({ payload }, sagaEffects) {
            const { call, put } = sagaEffects;
            const puzzle = yield call(addList, payload);

            yield put({ type: 'getList', payload: puzzle });
        },
        *updateInitCards({ payload }, sagaEffects) {
            
            const { call, put } = sagaEffects;
            const puzzle = yield call(updateList, payload);

            yield put({ type: 'getList', payload: puzzle });
        },
        *deleteInitCards( {payload} , sagaEffects) {
            
            const { call, put } = sagaEffects;
            const puzzle = yield call(deleteListById, payload);

            yield put({ type: 'getList', payload: puzzle });
        },
    },
};