import { useState, useEffect } from 'react'
import { getUsers } from '../api/usersApi'

function users() {
  // Store the users returned by the database.
  // Start with an empty array because the data has not loaded yet.
  const [users, setUsers] = useState([])

  // Track whether the users are still loading.
  const [isLoading, setIsLoading] = useState(true)

  // Store an error message if the request fails.
  const [errorMsg, setErrorMsg] = useState('')

  // Fetch users when the component first mounts.
  useEffect(() => {
    getUsers()
      .then((items) => {
        // Save the returned users in state.
        setUsers(items)
      })
      .catch((error) => {
        // Display an error message if the request fails.
        setErrorMsg('Could not load users: ' + error.message)
      })
      .finally(() => {
        // Stop loading whether the request succeeds or fails.
        setIsLoading(false)
      })
  }, [])

  // Display a loading message while fetching users.
  if (isLoading) {
    return <p className="page">Loading users...</p>
  }

  // Display an error message if fetching users fails.
  if (errorMsg) {
    return (
      <p className="page" style={{ color: 'red' }}>
        {errorMsg}
      </p>
    )
  }

  // Display each user's name.
  return (
    <div className="page">
      <h1>Users</h1>

      {users.map((user) => (
        <p key={user.id}>
          {user.name}
        </p>
      ))}
    </div>
  )
}

export default users
