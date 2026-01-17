import { Stack, Grid, Button, Box, TextField } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/lostwoods')({
  component: RouteComponent,
})

function RouteComponent() {
    
  return (
    <Stack>
        <Grid
        container
        spacing={0}
        sx={{
            minHeight: "10vh",
            minWidth: "100vw",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor:"#f0f0f0"
        }}
        >
        {Array.from({ length: 9 }).map((_, i) => (
            <Grid size ={4} key={i}
            sx = {{
                height:120,
                padding:3,
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                backgroundColor:"#f0f0f0"
            }}
            >
            <Button
            
                variant="contained"
                href="/lostwoods"
                sx={{
                    height: "100%"
                }}
            >
                {i + 1}
            </Button>
            </Grid>
        ))}
        </Grid>
        <Box sx = {{
            flexGrow:1,
            minHeight: "1500px",
            backgroundColor:"#f0f0f0"
        }}>
            
        </Box>
        <Button
            
            href="/login"
            sx={{
                backgroundColor: "#f0f0f0",
                color: "#f0f0f0",
                border: "1px solid #f0f0f0",
                borderRadius:1,
                maxWidth:"20px",
                

            }}
        >
            What's This
        </Button>



    </Stack>
  );
}

