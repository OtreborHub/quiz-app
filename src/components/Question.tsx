import { Box, Grid, List, ListItemButton, ListItemText, Typography } from "@mui/material";


interface questionProps {
    index: number;
    quest: string;
    answers: string[];
    ansQuestion: (answer: string) => void;
  }

export default function Question({index,  quest,  answers, ansQuestion}: questionProps) {

    function getLetter(id: number){
        switch(id){
            case 0:
                return "A";
            case 1:
                return "B";
            case 2:
                return "C";
            case 3:
                return "D";
            default:
                return "error";
        }
    }

    return (
        <>
            <Typography
                        variant="h2" 
                        fontWeight="bold"
                        alignSelf={"center"}
                        marginBottom={"1rem"}
                        color={"whitesmoke"}
                        // className='animated-text'
                        > Climate <span className='accent'>Quiz</span>
            </Typography>
            <Box
            width={"75%"} 
            marginTop={"2rem"} 
            alignSelf={"center"} 
            border={"2px solid whitesmoke"}>
                
                <Grid container> 
                    <Grid item xs={2} 
                    marginTop={"1rem"}
                    width={"fit-content"}
                    height={"fit-content"} 
                    // border={"2px solid whitesmoke"}
                    borderLeft={"0rem"}>
                        <Typography
                        key={index+"index"} 
                        // className="animated-text"
                        color={"whitesmoke"}
                        fontSize={"1.7rem"}
                        textAlign={"center"}
                        >
                        {index < 9 ? "0" : ""}
                        {/* <span className="accent">{index+1}</span> */}
                        {index + 1}
                    </Typography>

                    {/* BOX ICONE */}
                    <Box display={"flex"} justifyContent={"space-evenly"} marginBottom={"1rem"}>
                        {/* For di Categories per domanda */}
                        {/* <WaterDropIcon color="success" fontSize='large'/>
                        <MasksIcon color="success" fontSize='large'/> */}
                    </Box>

                    </Grid>
                    <Grid item xs={10}>
                        <Typography
                        key={index+"quest"} 
                        className="animated-text"
                        color={"whitesmoke"}
                        fontSize={"1.4rem"}
                        margin={"1rem"}>
                            {quest}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box 
            width={"75%"} 
            margin={"2rem"}
            marginTop={"0rem"} 
            alignSelf={"center"} 
            // border={"2px solid whitesmoke"}
            // borderTop={"0px"}
            color={"whitesmoke"}>
                <List component="nav">
                {answers?.map((answer, id) => (
                    <ListItemButton
                        sx={{ margin:"1rem", border:"2px solid whitesmoke"}}
                        key={id}
                        selected={false}
                        onClick={() => ansQuestion(answer)}                        >

                        <ListItemText primary={
                            <Typography 
                            key={index+"ans"} 
                            className="animated-text"
                            variant="body2" 
                            margin="0.5rem"
                            color={"whitesmoke"}
                            >{getLetter(id) + ") " + answer}
                            </Typography>
                            } />
                            
                    </ListItemButton>
                ))}
                </List>
            </Box>
        </>
    );
}