import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useMediaQuery } from 'react-responsive';
import { Link } from "react-router-dom";
import '../styles/home.css';

export default function Home() {

  // const [name, setName] = useState("");

  // const handleNameChange = (event: { target: { value: string; }; }) => {
  //   const name = event.target.value;
  //   setName(name);
  // }

  const isMobile = useMediaQuery({ query: '(max-width: 900px)' });
  // const isDesktop = useMediaQuery({ query: '(min-width: 900px)' });

  return (  
    <div className='home-container'>
          <Box className="outside-box"> 
            <Box className="inside-box">
                <Typography
                    variant="h1" 
                    fontWeight="bold"
                    fontSize={isMobile ? "3rem" : "4.5rem"}
                    marginBottom={"1rem"}
                    color={"whitesmoke"}
                    className='animated-text'
                    > Climate <span className='accent'>Quiz</span>
                </Typography>
                <Typography
                    variant="h2"
                    fontWeight="bold"
                    fontSize={isMobile ? "1.2rem" : "1.5rem"}
                    color={"whitesmoke"}>
                    {/*Ciao<span className='accent'>{name != "" ?  " " + name.toUpperCase() : ""}</span>! <br/> */}
                    Tieni all'ambiente?<br/> E quanto ci tieni? <br/> Sai perchè il clima sta cambiando negli ultimi decenni?<br/>
                </Typography>
                <Typography
                  variant="h2"
                  marginTop={"1rem"}
                  fontSize={isMobile ? "1.2rem" : "1.5rem"}
                  color={"whitesmoke"}>
                  10 domande, 4 opzioni, 1 risposta esatta: tema ecostenibilità, energia rinnovabile e cambiamento climatico.<br/>
                  {/* Scrivi come ti chiami e partiamo! */}
                </Typography>
              {/* <TextField
                  label="Nome" 
                  variant="filled"
                  color="success" 
                  focused
                  // color="success"
                  sx={{ margin: "1rem", width: "75%", backgroundColor:"#ffffff46"}}
                  onChange={handleNameChange}
                  /> */}
              <Box width={"50%"} alignSelf={"center"}>
                <Link to={"/quiz"}>
                    <Button 
                        sx={{marginTop:"1rem"}}
                        variant="contained" 
                        color="success"
                        // disabled={props.name !== '' ? false : true}
                        >
                        VAI AL QUIZ
                    </Button>
                </Link>
              </Box>
            </Box>
          </Box>
    </div>
    );
}

