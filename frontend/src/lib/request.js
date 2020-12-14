import axios from 'axios';

//Backend는 3001port에서 동작중이므로 주소를 설정한다.
const API_DEFAULT = "http://localhost:3001/";
const instance = axios.create({ baseURL: API_DEFAULT });

//GET을 통해 review 정보들을 읽어온다.
export async function getBoard(page) {
    //const result = await instance.get('/Board/'+page);
    return await getBoard("",page);
}
export async function getBoardByTitle(title, page) {
    //const result = await instance.get('/Board/'+page);
    return { list:[{_id:0,title:"Test1", good:5},{_id:1,title:"Test2", good:2}], totalPages:20 };
}
export async function getMyList(page) {
    //const result = await instance.get('/Board/'+page);
    return { list:[{_id:0,title:"Test1", good:5},{_id:1,title:"Test2", good:2}], totalPages:20 };
}
//GET을 통해 review 정보들을 읽어온다.
export async function getView(id) {
    //const result = await instance.get('/Board/'+page);
    //return result.data;
    return{data:{_id:0, title:"test1",content:"Content", media:[]}};
}

//POST를 통해 새로운 review를 전달한다.
export async function createReview(movie_name, review_content, rate) {
    await instance.post('/', {movie_name, review_content, rate});
}

//DELETE를 통해 삭제할 id를 전달한다.
export async function deleteReview(id) {
    await instance.delete(String(id));
}