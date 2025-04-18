import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <>
        <div>navbar</div>
        <Outlet />
        <div>footer</div>
    </>
  )
}

export default Layout