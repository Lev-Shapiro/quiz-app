import { useState } from "react";

import Head from "next/head";

import { Backdrop } from "@mui/material";
import { CreateGame, Game } from "components";

import { useFetchQuestionsQuery } from "features/questions/questions.slice";

export default function Home() {
    const [amount, setAmount] = useState(0);

    const handleSubmit = (amount: number) => {
        setAmount(amount);
    };

    const handleClear = () => setAmount(0);

    const { data, isFetching } = useFetchQuestionsQuery(amount);

    const questions = data?.results;

    return (
        <>
            <Head>
                <title>Quiz App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <main>
                <CreateGame open={!amount} setQuestionsAmount={handleSubmit} />

                {(amount && isFetching) ? (
                    <Backdrop
                        open={true}
                        sx={{
                            color: "#fff",
                            zIndex: (theme) => theme.zIndex.drawer + 1,
                        }}
                    />
                ) : <></>}

                {(amount && questions?.length) ? (
                    <Game questions={questions} clearQuestions={handleClear} />
                ) : <></>}
            </main>
        </>
    );
}
