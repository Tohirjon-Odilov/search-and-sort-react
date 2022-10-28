import { useState } from "react";
import './App.css';
import { data } from "../../data/users"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"

function App() {

  /**********
   * !HOOKS *
   **********/
  const [users, setUsers] = useState(data)
  const [sorted, setSorted] = useState({ sorted: "id", reserved: false })
  const [searchPrathe, setSearchPrathe] = useState("")

  /**********
   * !SORT *
   **********/
  const sortById = () => {
    setSorted({ sorted: "id", reserved: !sorted.reserved })
    const userCopy = [...users]
    userCopy.sort((userA, userB) => {
      if (sorted.reserved) {
        return userA.id - userB.id
      }
      return userB.id - userA.id
    })
    setUsers(userCopy)
  }
  const sortByName = () => {
    setSorted({ sorted: "name", reserved: !sorted.reserved })
    const userCopy = [...users]
    userCopy.sort((userA, userB) => {
      let fullNameA = `${userA.first_name} ${userA.last_name}`
      let fullNameB = `${userB.first_name} ${userB.last_name}`

      if (sorted.reserved) {
        return fullNameA.localeCompare(fullNameB)
      }
      return fullNameB.localeCompare(fullNameA)
    })
    setUsers(userCopy)
  }
  // const sortByEmail = () => { }
  // const sortByGender = () => { }

  /***********
   * !SEARCH *
   ***********/
  const search = (e) => {
    const matchPrathe = data.filter((user) =>
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(e.target.value.toLowerCase())
    )
    setUsers(matchPrathe)
    setSearchPrathe(e.target.value)
  }

  /*********
   * !ICONS *
   *********/
  const renderArrow = () => {
    if (sorted.reserved) {
      return <FaArrowUp />
    }
    return <FaArrowDown />
  }

  /***********
   * !RENDER *
   ***********/
  const userRender = () => {
    return users.map((user) => {
      return (
        <tr>
          <td>{user.id}</td>
          <td>{`${user.first_name} ${user.last_name}`}</td>
          <td>{user.email}</td>
          <td>{user.gender}</td>
        </tr>
      )
    })
  }

  return (
    <div className="App">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchPrathe}
          onChange={search}
        />
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={sortById} >
                <span>
                  id {sorted.sorted === 'id' ? renderArrow() : null}
                </span>
              </th>
              <th onClick={sortByName} >
                <span>
                  Name {sorted.sorted === 'name' ? renderArrow() : null}
                </span>
              </th>
              <th >
                <span>
                  Email
                </span>
              </th>
              <th >
                <span>
                  Gender
                </span>
              </th>
            </tr>
          </thead>
          <tbody>{userRender()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
