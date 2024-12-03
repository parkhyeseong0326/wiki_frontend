import "./WikiPage.css";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";

function WikiPage() {
    const {searchQuery} = useParams();
    const [data,setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/Cat/${searchQuery}`);
                if (response.ok) {
                    const myData = await response.json();
                    setData(myData);
                }else {
                    const errorMessage = await response.json()
                    setError(errorMessage.message);
                }
            }catch (error) {
                setError("데이터를 가져오는 중 오류가 발생했습니다.")
            }
        };
        fetchData();
    },[searchQuery])

    return (
        <div className="container">
            <h1>{searchQuery}</h1>
            <div className="article-container">
                {error ? (
                    <p>{error}</p>
                ) : data ? (
                    <div>
                    <p>{data.종}</p>
                    <p>대분류 : {data.대분류}</p>
                    <p>계 : {data.계}</p>
                    <p>문 : {data.문}</p>
                    <p>강 : {data.강}</p>
                    <p>목 : {data.목}</p>
                    <p>괴 : {data.괴}</p>
                    <p>학 : {data.학}</p>
                    <p>멸종위기등급 : {data.멸종위기등급}</p>
                    <p>무게 : {data.무게}</p>
                    <p>몸의 빛깔 : {data.몸의빛깔}</p>
                    <p>분포지역 : {data.분포지역}</p>
                    <p>성격 : {data.성격}</p>
                    </div>
                ) : (
                    <p>데이터를 로드 중입니다.</p>
                )}
            </div>
        </div>
    )
}
export default WikiPage;