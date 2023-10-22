
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Grid, IconButton, List, ListItemButton, ListItemText, Typography } from "@mui/material";

interface questionProps {
    index: number;
    quest: string;
    answers: string[];
    ansQuestion: (answer: string) => void;
    prevQuestion: () => void;
}

export default function Question({ index, quest, answers, ansQuestion, prevQuestion }: questionProps) {

    function getLetter(id: number) {
        switch (id) {
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
            <Box
            width={"75%"}
            marginTop={"2rem"}
            alignSelf={"center"}
            border={"2px solid green"}
            borderRadius={"1rem"}>
                <Grid container>

                    <Grid item xs={3}
                    marginTop={"1rem"}
                    width={"fit-content"}
                    height={"fit-content"}>
                        <Box
                        display={"flex"}
                        justifyContent={"center"}>
                            {index !== 0 &&
                                <IconButton onClick={prevQuestion} color='success' sx={{ width: "fit-content", padding: "0px" }}>
                                    <ArrowBackIosIcon fontSize='medium' />
                                </IconButton>
                            }
                            <Typography
                            variant="h5"
                            key={index + "index"}
                            color={"whitesmoke"}
                            textAlign={"center"}>
                                {index < 9 ? "0" : ""}
                                <span className="accent"><b>{index + 1}</b></span>
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={8}
                    marginTop={"1rem"}
                    marginBottom={"1rem"}
                    marginRight={"1rem"}>
                        <Typography
                        variant="h6"
                        key={index + "quest"}
                        className="animated-text"
                        color={"whitesmoke"}>
                            {quest}
                        </Typography>
                    </Grid>

                </Grid>
            </Box>
            <Box
            width={"75%"}
            alignSelf={"center"}
            color={"whitesmoke"}>
                <List component="nav">
                    {answers?.map((answer, id) => (
                        <ListItemButton
                            sx={{ margin:"1rem", border: "2px solid green", borderRadius: "1rem" }}
                            key={id}
                            selected={true}
                            onClick={() => ansQuestion(answer)}>

                            <ListItemText primary={
                                <Typography
                                    key={index + "ans"}
                                    className="animated-text"
                                    variant="body2"
                                    color={"whitesmoke"}>
                                        {getLetter(id) + ") "}
                                        {answer}
                                </Typography>
                            } />
                        </ListItemButton>
                    ))}
                </List>
            </Box>
        </>
    );
}