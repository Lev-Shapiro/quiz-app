import { FC } from "react";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";

interface CreateGameProps {
    open: boolean;

    setQuestionsAmount: (amount: number) => void;
}

export const CreateGame: FC<CreateGameProps> = ({
    open,
    setQuestionsAmount,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setQuestionsAmount(data.amount);
    };

    return (
        <Dialog open={open}>
            <DialogTitle>Create game</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <DialogContentText pb={3}>
                        To start the game you should enter amount of questions
                        you would like to appear during the game
                    </DialogContentText>
                    <TextField
                        {...register("amount", {
                            required: true,
                            pattern: /[0-9]+/,
                        })}
                        error={!!errors.amount}
                        helperText={
                            errors.amount &&
                            (errors.amount.type === "required"
                                ? "This field is required"
                                : "Format not valid")
                        }
                        autoFocus
                        margin="dense"
                        label="Amount of questions"
                        fullWidth
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button type="submit" variant="contained">
                        Submit
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
