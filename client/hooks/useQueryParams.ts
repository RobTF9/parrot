import { useLocation } from 'react-router-dom';

function useQueryParams(): URLSearchParams {
  return new URLSearchParams(useLocation().search);
}

export default useQueryParams;
