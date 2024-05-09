import useFetchMeal from "../hooks/useFetchMeal";
import _ from 'lodash';
import { useSelector, useDispatch} from 'react-redux';
import { setCurrentPage } from '../redux/actions';


export default function usePagination(){

  const {meals} = useFetchMeal();
  const  dispatch = useDispatch();

  const page = useSelector(state => state.currentPage);
  const limit = useSelector(state => state.limitCards);

  const siblings = 1;
  const totalPage = Math.ceil(meals.length / limit);

function returnPaginationRange(total, p, sibl){

    let totalPageNoInArray = 5 + sibl;

    let  leftSiblindsIndex = Math.max(p - sibl, 1);
    let  rightSiblindsIndex = Math.min(p + sibl, total);

    let showLeftDots = leftSiblindsIndex > 2;
    let showRightDots = rightSiblindsIndex < total - 2;

    if(totalPageNoInArray >= total){

      return _.range(1, total + 1);
      
    }

    if(!showLeftDots && showRightDots){
      let leftItemsCount = 3 + 2 * sibl;
      let leftRange = _.range(1, leftItemsCount +1);

      return [...leftRange, "...", total];

    }
    else if (showLeftDots && !showRightDots){

      let rightItemsCount = 3 + 2 * sibl;
      let rightRange =  _.range(total - rightItemsCount + 1,  total + 1);

      return [1, "...", ...rightRange];
    }
    else{
      let middleRange =  _.range(leftSiblindsIndex, rightSiblindsIndex + 1);

      return [1, "...", ...middleRange, "...", total];
    }
  }

  function handlePageChange(value){
    if(value === "&laquo;" || value === "..."){
      dispatch(setCurrentPage(1));
    }
    else if(value === "&lsaquo;"){
      if(page !== 1)
      dispatch(setCurrentPage(page - 1));
    }
    else if(value === "&rsaquo;"){
      if(page !== totalPage)
      dispatch(setCurrentPage(page + 1));
    }
    else if(value === "&raquo;" || value === "..."){
      dispatch(setCurrentPage(totalPage));
    }
    else{
      dispatch(setCurrentPage(value));
    }

  }

  const array = returnPaginationRange(totalPage, page, siblings);

  return {
    page,
    limit,
    array,
    handlePageChange
  }
}


