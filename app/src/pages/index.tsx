import type { NextPage } from "next";
import { FloatBar } from "../components/FloatBar";
import { List } from "../components/List";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className="flex-col gap-20 h-full">
      <List />
      <FloatBar />
    </div>
  );
};

export default Home;
