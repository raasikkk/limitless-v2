
const Register = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
        <div className="p-3 flex flex-col w-1/2 h-1/2 border rounded-xl text-center">
            <p>Logo</p>
            <h2 className="font-semibold text-3xl">Register with Email</h2>
            <form 
                className="flex flex-col gap-3"    
            >
                <div className="flex flex-col text-start">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text" 
                        id="email" 
                        placeholder="Type here..."
                        className="border rounded-xl p-2"
                    />
                </div>

                <div className="flex flex-col text-start">
                    <label htmlFor="password">Email</label>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Type here..."
                        className="border rounded-xl p-2"
                    />
                </div>

                <div className="flex flex-col text-start">
                    <label htmlFor="name">Full Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        placeholder="Type here..."
                        className="border rounded-xl p-2"
                    />
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register