"use client";
import { motion } from "framer-motion";
import styles from "@/styles/FloatingBalloon.module.css";
// import mojs from "@mojs/core";
import balloon from "@/public/balloon.png";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function FloatingBalloon() {
  const [MojsBurst, setMojsBurst] = useState(null);
  const initializeMojs = async () => {
    if (!MojsBurst) {
      const mojs = (await import("@mojs/core")).default;
      setMojsBurst(() => mojs.Burst);
    }
  };
  useEffect(() => {
    initializeMojs();
  });

  const popBalloon = (e) => {
    const t = e.currentTarget;

    if (!MojsBurst) return;

    const burst = new MojsBurst({
      radius: {
        100: 200,
      },
      // parent: t,
      count: 10,

      duration: 2000,
      children: {
        fill: ["#33ccff", "magenta", "pink"],
        angle: {
          0: 180,
        },
        degreeShift: "rand(-360, 360)",
        delay: "stagger(0, 25)",
        shape: ["circle", "polygon"],
      },
    });
    burst.replay(); // setVisible(false)

    t.style.visibility = "hidden";
  };

  return (
    <motion.div
      //   className={`balloon ${isBurst ? "burst" : ""}`}
      className={styles.balloon}
      // initial={{ y: 0, opacity: 1 }} // 초기 위치를 중앙으로 설정
      animate={{ y: [0, -50, 0] }} // 풍선이 위로 올라갔다가 다시 내려오도록 설
      //   animate={isBurst ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
      onClick={(e) => popBalloon(e)}
      transition={{
        duration: 3,
        delay: 0,
        repeat: Infinity,
        repeatType: "mirror",
      }} // 풍선이 무한히 반복해서 위아래로 움직이도록 설정
    >
      <Image src={balloon} alt="" width={600} height={600}></Image>
    </motion.div>
  );
}
