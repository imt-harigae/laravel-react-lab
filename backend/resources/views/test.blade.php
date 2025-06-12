<!doctype html>
<html>

<head>
    <meta charset="UTF-8" />
    <meta name="color-scheme" content="dark" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/gsap.min.js"></script>
    <script>
        window.addEventListener("DOMContentLoaded", () => {
            // デモ説明のためのデフォルト設定。
            // 実際のコードではこのデフォルト設定は無効にしましょう。


            for (let i = 0; i < 300; i++) {
                const rect = document.createElement("div");
                rect.classList.add("rect");
                document.querySelector(".container").appendChild(rect);
            }

            // 格子状に適用
            gsap.from(".rect", {
                repeat: -1, // 無限に繰り返し
                repeatDelay: 0.5, // 繰り返し時に0.5秒の待機
                yoyo: true, // 逆方向にもアニメーションを適用
                scale: 0,
                duration: 1,
                ease: "power4.out",
                autoAlpha: 0,
                stagger: {
                    each: 0.05,
                    from: "center", // 中央から
                    grid: "auto", // 格子状に開始
                    ease: "power4.out", // 間隔に対するイージング
                },
            });
        });
    </script>
    <style>
        body {
            color: white;
            background: #000;
            font-family: sans-serif;
            margin: 0;
            padding: 2rem;
            box-sizing: border-box;
        }

        .container {
            display: grid;
            grid-template-columns: repeat(auto-fill, 40px);
            gap: 4px;
            justify-content: center;
            /* 中央寄せ */
            max-width: 90vw;
            /* 最大幅指定 */
            margin: 0 auto;
        }

        .rect {
            width: 40px;
            height: 40px;
            background: white;
            display: block;
        }
    </style>
</head>

<body>
    <div class="container"></div>
</body>

</html>
