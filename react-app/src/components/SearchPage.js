import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Developer.css'

function SearchPage() {
  const devs = useSelector(state => state.developers);
  const [ searchedDevs, setSearchedDevs ] = useState([]);
  const [ pageLoaded, setPageLoaded ] = useState(false)
  const { params } = useParams();

  useEffect(() => {
    let searchParam = [];
    if (params.includes(', ')) searchParam = params.split(', ');
    else searchParam.push(params);
    let wanted_devs;
    if (searchParam.length > 1) {
      let skillCheck = (arr, targetArr) => targetArr?.every(el => arr.includes(el))
      
      let lowerCase = (arr) => {
        return arr.map(el => {
        return el.toLowerCase()
      })}
        wanted_devs = Object.values(devs).filter(dev => (dev.city.toLowerCase() === searchParam[0].toLowerCase().trim() && dev.state.toLowerCase() === searchParam[1].toLowerCase().trim()) ||
          skillCheck(lowerCase(dev.skills), lowerCase(searchParam))
          )
          
    } else {
      
      wanted_devs = Object.values(devs).filter(dev => dev.state.toLowerCase() === searchParam[0].toLowerCase().trim() ||
        dev.city.toLowerCase() === searchParam[0].toLowerCase().trim() ||
        dev.skills.find(el => {
          return el.toLowerCase().match(searchParam[0].toLowerCase().trim())
        })
        )
      
    }
    setSearchedDevs(wanted_devs);
    setPageLoaded(true);
  }, [params, devs])

  const devsComponents = searchedDevs?.map((dev) => {
    return (
      <NavLink to={`/developers/${dev.id}`} className='Dev-list-single' key={dev.id}>
        <div className="inner-single-dev">
          <div>
            <i className={`dev-icon ${dev.icon}`} />
            <div>{dev.name}</div>
          </div>
          <p>{dev.skills.join(", ")}</p>
        </div>
      </NavLink>
    );
  });

  return (
      <>
      {pageLoaded &&
      <>
        <h1 className='developers-title'>{searchedDevs.length > 0 ? 'Search Results' : 'No Devs match your search' }</h1>
        <div className='Dev-list'>
          <div>{devsComponents}</div>
        </div>
      </>
      }
    </>
  );
}

export default SearchPage;
