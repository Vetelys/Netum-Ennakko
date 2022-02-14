import React from 'react';

const headers = [
    {key: "header-1", sort_key: "first_name", title: "First Name"},
    {key: "header-2", sort_key: "last_name", title: "Last Name"},
    {key: "header-3", sort_key: "age", title: "Age"} 
  ];

interface Props{
    sort: (event: React.MouseEvent<HTMLHeadingElement>) => void;
}

function Header(props: Props){
    return(
        <thead className='table-headers'>
        <tr>
          {headers.map((row) => {
            // return <th onClick={sortByColumn} key={row.key} sort-key={row.sort_key}>{row.title}</th>})}
            return <th onClick={props.sort} sort-key={row.sort_key}>{row.title}</th>})}
        </tr>
      </thead>
    )
}

export default Header