import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Register.module.css';
import axios from '../api/axios';

const USER_REGEX    = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX     = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REG_URL       = '/api/users';

const Register = () => {
    const userRef = useRef();
    const errRef  = useRef();
    
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    },[]);

    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidName(result);
    },[user]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    },[pwd,matchPwd]);

    useEffect(() => {
        setErrMsg('');
    },[user, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        //Aditional Validations
        var userVal = USER_REGEX.test(user);
        var pwdVal  = PWD_REGEX.test(pwd);
        if(!userVal || !pwdVal) {
            setErrMsg('Invalid Entry');
            return;
        }
        //Submit to the backend
        try{
            const response = await axios.post(REG_URL,
                JSON.stringify({
                    id: 50,
                    name: 'Luis Salazar',
                    email: 'luisnsalazarl@gmail.com',
                    user: user,
                    password:pwd,
                    activ: 1
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: false
                }
            );
            console.log(response.data);
            console.log(response.accessToken);
            console.log(JSON.stringify(response));
            setSuccess(true);
            //clear input flieds
        }catch (err) {
            if(!err?.response){
                setErrMsg('No Swerver Response');
            }else if(err.response?.status === 409){
                setErrMsg('User Name Taken!!!');
            }else {
                setErrMsg('Registration falied');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Success</h1>
                    <p>
                        <a href='#'>Sing In</a>
                    </p>
                </section>
            ) : (
            <section className= {`${styles.cardMd} ${styles.flexColumn}`}>
                <p ref={errRef} className={errMsg ? "errMsg" : 
                    "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Register</h1>
                <form onSubmit={handleSubmit} className= {`${styles.flexColumn}`}>
                    <label htmlFor="username">
                        UserName:
                        <span className={validName ? styles.valid : styles.hide}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validName || !user ? styles.hide : styles.invalid}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                    <input
                        type='text'
                        id='username'
                        ref={userRef}
                        autoComplete='off'
                        onChange={(e) => setUser(e.target.value)}
                        required
                        aria-invalid={validName ? 'false' : 'true'}
                        aria-describedby='uidnote'
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                        className={styles['mb-sm']}                   
                    />
                    <p id='uidnote' className={userFocus && user && 
                    !validName ? styles.instructions : styles.offscreen}>
                        <FontAwesomeIcon icon={faInfoCircle}/>
                        4 to 24 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed.<br />
                    </p>
                    <label htmlFor="password">
                        Password:
                        <span className={validPwd ? styles.valid : styles.hide}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validPwd || !pwd ? styles.hide : styles.invalid}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                    <input
                        type='password'
                        id='password'
                        onChange={(e) => setPwd(e.target.value)}
                        required
                        aria-invalid={validPwd ? 'false' : 'true'}
                        aria-describedby='pwdnote'
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                        className={styles['mb-sm']}  
                    />
                    <p id='pwdnote' className={pwdFocus && !validPwd ? styles.instructions : 
                        styles.offscreen}>
                        <FontAwesomeIcon icon={faInfoCircle}/>
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and 
                        a special character <br />
                    </p>
                    <label htmlFor="matchpwd">
                        Confirm Password:
                        <span className={validMatch && matchPwd ? styles.valid : styles.hide}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validMatch || !matchPwd ? styles.hide : styles.invalid}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                    <input
                        type='password'
                        id="matchpwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        required
                        aria-invalid={validMatch ? 'false' : 'true'}
                        aria-describedby='matchnote'
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                        className={styles['mb-sm']}  
                    />
                    <p id='matchnote' className={matchFocus && 
                    !validMatch ? styles.instructions : styles.offscreen}>
                        <FontAwesomeIcon icon={faInfoCircle}/>
                        Must match the firts password input field.<br />
                    </p>

                    <button disabled={!validName || !validPwd ||!validMatch ? true : false}
                    className={styles.gapSm}>Sing Up</button>
                </form>
            </section>
            )}
        </>
    )
}

export default Register