import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';
import { Level } from '../utils/level';

export default function Home() {
  
  const navigate = useNavigate();
  const [level, setLevel] = useState<Level>(Level.EASY);

  const isMobile = useMediaQuery({ query: '(max-width: 900px)' });
  // const isDesktop = useMediaQuery({ query: '(min-width: 900px)' });

  function handleChangeLevel(level: string){
    if(level === Level.EASY){
      setLevel(Level.INTERMEDIATE);
    } else if (level === Level.INTERMEDIATE) {
      setLevel(Level.DIFFICULT);
    } else if (level === Level.DIFFICULT) {
      setLevel(Level.EASY);
    } 
  };

  function goNext(){
    navigate("/quiz", { state: { level: level }} );
  }

  return (  
    <div className='home-container'>
            <Box className="inside-box">
                <Typography
                  variant="h1" 
                  fontWeight="bold"
                  fontSize={isMobile ? "3rem" : "4.5rem"}
                  marginBottom={"1rem"}
                  color={"whitesmoke"}
                  className='animated-text'>
                    Climate <span className='accent'>Quiz</span>
                </Typography>
                <Typography
                  variant="h2"
                  fontWeight="bold"
                  fontSize={isMobile ? "1.2rem" : "1.5rem"}
                  color={"whitesmoke"}>
                    Tieni all'ambiente?<br/> E quanto ci tieni? <br/> Noti anche tu che fa più caldo negli ultimi anni?<br/>
                    Ti dico io il perchè: il clima sta cambiando e ad una velocità impressionante, ma sapresti dirmi come e perchè?
                </Typography>
                <Typography
                  variant="h2"
                  marginTop={"1rem"}
                  fontSize={isMobile ? "1.2rem" : "1.5rem"}
                  color={"whitesmoke"}>
                    10 domande, 4 opzioni, 1 risposta esatta: i temi sono ecosostenibilità, ambiente, cambiamenti climatici ed energia rinnovabile.<br/>
                    Scegli la difficoltà e quando ti senti pronto partiamo. <br/> Dai il meglio di te e condividi il risultato con i tuoi amici!
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
              <Box sx={{marginTop:"2rem"}} width={"50%"} display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
                  <Button 
                    variant="contained" 
                    color="success" 
                    size="large" 
                    sx={{fontWeight:"bold"}} 
                    onClick={() => handleChangeLevel(level)}>
                    { level } 
                  </Button>
                  <Button 
                      size="large"
                      sx={{fontSize:"1.3rem", fontWeight:"bold"}}
                      variant="text" 
                      color="success"
                      onClick={() => goNext()}>
                      VAI AL QUIZ
                  </Button>
              </Box>
          </Box>
    </div>
    );
}

