import axios from 'axios';

//Backend는 3001port에서 동작중이므로 주소를 설정한다.
const API_DEFAULT = "http://localhost:3001/";
axios.defaults.withCredentials = true;
const instance = axios.create({ baseURL: API_DEFAULT });

//GET을 통해 review 정보들을 읽어온다.
export async function getBoard(page) {
    //const result = await instance.get('/Board/'+page);
    return await getBoard("",page);
}
export async function getBoardByTitle(title, page) {
    const result = await instance.get('/api/board?title='+title+'&page='+page);
    return result;
}
export async function getMyList(page) {
    const result = await instance.get('/api/board/My?page='+page);
    return result.data;
    
}
//GET을 통해 review 정보들을 읽어온다.
export async function getView(id) {
    const result = await instance.get('/api/board/view?id='+id)
    .catch(function (error) {
        if(error.response.status !== 200)
            alert(error.data.err);
    });
    console.log(result.data);
    return result.data;
}
export async function getTipsByGeo(location, zoomLevel)
{
    const result = await instance.get('/api/board/geoList?zoom='+zoomLevel+'&lat='+location.y+'&lng='+location.x);
    //return { list:[{_id:0,title:"Test1", good:5},{_id:1,title:"Test2", good:2}], totalPages:20 };

    return result.data.list;
}
export async function getMarkerByGeo(location, zoomLevel)
{
    let result = await instance.get('/api/board/geoMarker?zoom='+zoomLevel+'&lat='+location.y+'&lng='+location.x);
    let mapRef = window.naver.maps;
    let data = result.data;
    let out = [];
    data.map(loc=>out.push(new mapRef.Marker({position:new mapRef.LatLng(loc[1], loc[0])})));
    //let data = [{position:new mapRef.LatLng(37.3595704, 127.105399)},{position:new mapRef.LatLng(37.3595700, 127.105399)},{position:new mapRef.LatLng(37.3595704, 127.105390)},{position:new mapRef.LatLng(37.3590704, 127.105399)}];
    //data.map((element, i) => (out.push(new mapRef.Marker(element))));
    return out;
}

export async function CreateTip(title, content, media, location)
{
    const formData = new FormData();
    for(let i=0,ii=media.length; i<ii;i++)
        formData.append("media",media[i].file);

    formData.append("title",title);
    formData.append("content",content);
    if(location === null)
    {
        formData.append("loc_lat",0);
        formData.append("loc_lng",0);
    }
    else
    {
        formData.append("loc_lat",location.lat);
        formData.append("loc_lng",location.lng);
    }
    let result = await instance.post('/api/board/create', formData)
    .catch(function (error) {
        if(error.response.status === 500)
            result = "확인되지 않은 문제. 관리자에게 문의하세요.";
    });
    return result;
}

export async function ChangePassword(oldP, newP)
{
    let out=null;
    let result = await instance.post('/auth/changePW', {oldP, newP})
    .catch(function (error) {
        console.log(error);
        if (error.response.status === 401)
        out = "입력한 현재 비밀번호가 다릅니다.";
        else if(error.response.status === 500)
        out = "확인되지 않은 문제. 관리자에게 문의하세요.";
    });
    if(out) return out;
    return result;
}
export async function Login(email, password)
{
    let out=null;
    let result = await instance.post('/auth/login', {email, password})
    .catch(function (error) {
        if (error.response.status === 401)
            out = "이메일 또는 비밀번호가 다릅니다.";
        else if(error.response.status === 500)
            out = "확인되지 않은 문제. 관리자에게 문의하세요.";
    });
    if(out) return out;
    return result;
}
export async function Logout()
{
    let out = null;
    await instance.get('/auth/logout')
    .catch(function (error) {
        if(error.response.status === 500)
            out = "확인되지 않은 문제. 관리자에게 문의하세요.";
    });
    return out;
}

export async function join(email, password)
{
    let out = null;
    await instance.post('/auth/join', {email, password})
    .catch(function (error) {
        if (error.response.status === 401)
            out = "이메일 또는 비밀번호가 다릅니다.";
        else if(error.response.status === 500)
            out = "확인되지 않은 문제. 관리자에게 문의하세요.";
    });
    return out;
}

//POST를 통해 새로운 review를 전달한다.
export async function createReview(movie_name, review_content, rate) {
    await instance.post('/', {movie_name, review_content, rate});
}

//DELETE를 통해 삭제할 id를 전달한다.
export async function deleteReview(id) {
    await instance.delete(String(id));
}