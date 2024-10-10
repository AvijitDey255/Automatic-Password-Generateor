
import { useState, useRef, useCallback } from 'react'
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const numbers = '0123456789'
const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
const specialCharacters = '!@#$%^&*()'

function App() {

  const [password, setpassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(10)
  const [includeUppercase, setIncludeUppercase] = useState(false)
  const [includeLowercase, setIncludeLowercase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const passwordRef = useRef(null);
  // const massage = 'Password Copyed Successfully'
  const notify = useCallback((massage,hasError=false) => {
    if(hasError)
    {
      toast.error(massage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
    }else{
      toast.success(massage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      
    }

   

  },[])


  // callback function to handle the generation of the password
  const handelGeneratedPassword = useCallback(() => {
    if(!includeLowercase && !includeUppercase && !includeNumbers && !includeSymbols)
    {
      notify('You must select at least one option',true)
      return
    }
    //initianlize an empty char list
    let characterList = ''
    // add selected character set to the empty character list
    if (includeUppercase) {
      characterList += upperCaseLetters
    }
    if (includeLowercase) {
      characterList += lowerCaseLetters
    }
    if (includeNumbers) {
      characterList += numbers
    }
    if (includeSymbols) {
      characterList += specialCharacters
    }
    // genearter a password use a state
    setpassword(createPassword(characterList))
  }, [includeUppercase, includeLowercase, includeNumbers, includeSymbols, passwordLength,notify])

  // function to generated a password 

  const createPassword = useCallback((characterList) => {
    let password = ''
    const characterListLength = characterList.length
    // 
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characterListLength)
      password += characterList.charAt(characterIndex)

    }
    return password
  }, [passwordLength])


  // callback function to copy the clicbord
  const copyToCliBoot = useCallback(() => {
    // select the text 
    passwordRef.current.select()
    passwordRef.current?.select()
    passwordRef.current?.setPasswordLength
    window.navigator.clipboard.writeText(password)
    // show a nitifcation
    notify('Password Copyed Successfull')

  }, [password,notify])



  return (
    <div className='min-h-screen bg-[#3b3b98] flex justify-center items-center  '>

      <div className='w-80'>
        <div className='bg-[#23235b] rounded shadow-lg p-5 '>
          <h2 className='text-center text-white mb-5 font-extrabold '>Password Generater</h2>
          <div className='relative bg-black bg-opacity-40 p-3 text-white h-12 mb-4 '>
            <input
              defaultValue={passwordLength}
              type="text"
              ref={passwordRef}
              value={password}
              readOnly
              className='w-full bg-transparent border-none text-white outline-none cursor-default '
            />
            <button onClick={copyToCliBoot} className='absolute bg-[#3b3b98] text-white border-none h-10 p-2 cursor-pointer top-1 right-1 '
            >
              <i className="far fa-clipboard"></i>
            </button>
          </div>
          <div className='flex justify-between text-white mb-4 '>
            <label htmlFor="Password Length">passwordLength</label>
            <input type="number" id='Password Length'
              name='Password Length'
              max="50"
              min="5"
              className='text-black w-16 '

              onChange={(e) => setPasswordLength(e.target.value)}
              defaultValue={passwordLength}

            />
          </div>
          <div className='flex justify-between text-white mb-4 '>
            <label htmlFor="Include Uppercase Letter">Include Uppercase Letter</label>
            <input
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              type="checkbox" id='Include Uppercase Letter'
              name='Include Uppercase Letter'
              className='text-black w-16 '
            />
          </div>
          <div className='flex justify-between text-white mb-4 '>
            <label htmlFor="Include Lowercase Letter">Include Lowercase Letter</label>
            <input
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              type="checkbox" id='Include Lowercase Letter'
              name='Include Lowercase Letter'
              className='text-black w-16 '
            />
          </div>

          <div className='flex justify-between text-white mb-4 '>
            <label htmlFor="Numbers">Include Numbers</label>
            <input
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              type="checkbox" id='Numbers'
              name='Numbers'
              className='text-black w-16 '
            />
          </div>
          <div className='flex justify-between text-white mb-4 '>
            <label htmlFor="Include Symbols">Include Symbols</label>
            <input
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              type="checkbox" id='Include Symbols'
              name='Include Symbols'
              className='text-black w-16 '
            />
          </div>
          <button className='bg-[#3b3b98] text-white font-bold w-full text-lg p-2 cursor-pointer ' onClick={handelGeneratedPassword}>Generater Password</button>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition:Bounce
          />

        </div>

      </div>



    </div>
  )
}

export default App
// 2.2 .45 time