// import Pagination from 'react-bootstrap/Pagination';
import usePagination from '../hooks/usePagination';
import { useDispatch} from 'react-redux';
import { setLimitCardsOnPage } from '../redux/actions';
import {useEffect} from 'react';


export default function PaginationComponent() {


const  { array, page, handlePageChange } = usePagination();

const  dispatch = useDispatch();

useEffect(() => {
    handlePageChange(1);
}, []);

    return (
        <>
            <div className="page-maincontainer">
                <div className="page-container">
                    <select onChange= {(e) => dispatch(setLimitCardsOnPage(e.target.value))} className="select">
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="6">6</option>
                    </select>
                    <ul className="pagination pagination-md justify-content-center">
                        <li className="page-item"><span onClick={() => handlePageChange('&laquo;')} className="page-link">&laquo;</span></li>
                        <li className="page-item"><span onClick={() => handlePageChange('&lsaquo;')} className="page-link">&lsaquo;</span></li>
                        {
                            array.map((value, index) => {
                                if(value === page){
                                return (
                                    <li key={index} className="page-item active"><span onClick={() => handlePageChange(value)} className="page-link">{value}</span></li>
                                )}
                                else{
                                    return (
                                    <li key={index} className="page-item"><span onClick={() => handlePageChange(value)} className="page-link">{value}</span></li>
                                )} 
                            })  
                        }
                        <li className="page-item"><span onClick={() => handlePageChange('&rsaquo;')} className="page-link">&rsaquo;</span></li>
                        <li className="page-item"><span onClick={() => handlePageChange('&raquo;')} className="page-link">&raquo;</span></li>
                    </ul>
                </div>
            </div>
        </>
    );
}
