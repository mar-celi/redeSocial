document.addEventListener("DOMContentLoaded", () => {
    const likeBtn = document.querySelector(".left-actions .action-btn:first-child");
    const postMedia = document.querySelector(".post-media");
    const bookmarkBtn = document.querySelector(".post-actions > .action-btn:last-child");

    if (!likeBtn) return;

    const likeSvg = likeBtn.querySelector("svg");

    // Localiza o nó de texto do contador dentro do botão
    let textNode = Array.from(likeBtn.childNodes).find(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== ""
    );

    // Variáveis de controle do contador e estado
    let baseLikes = 0;
    let isLiked = false;

    // Inicializa o contador com 0
    if (textNode) {
        textNode.textContent = ` ${baseLikes}`;
    }

    // Formata números (ex: 1000 -> 1.0K)
    function formatLikes(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        }
        return num.toString();
    }

    // Aplica o estilo visual de curtido
    function applyLikedStyle() {
        likeSvg.style.fill = "#ef4444";
        likeSvg.style.stroke = "#ef4444";
        
        // Efeito visual de animação (bounce)
        likeSvg.style.transform = "scale(1.3)";
        setTimeout(() => {
            likeSvg.style.transform = "scale(1)";
        }, 150);
    }

    // Remove o estilo visual de curtido
    function removeLikedStyle() {
        likeSvg.style.fill = "none";
        likeSvg.style.stroke = "currentColor";
        
        likeSvg.style.transform = "scale(1.3)";
        setTimeout(() => {
            likeSvg.style.transform = "scale(1)";
        }, 150);
    }

    // Função central para alternar curtida (Curtir / Descurtir)
    function toggleLike() {
        if (isLiked) {
            // Descurte (diminui, mas para em 0)
            isLiked = false;
            baseLikes = Math.max(0, baseLikes - 1);
            removeLikedStyle();
        } else {
            // Curte (aumenta)
            isLiked = true;
            baseLikes++;
            applyLikedStyle();
        }

        // Atualiza o texto na tela
        if (textNode) {
            textNode.textContent = ` ${formatLikes(baseLikes)}`;
        }
    }

    // Evento de clique no BOTÃO DE CORAÇÃO
    likeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleLike();
    });

    // Evento de clique na IMAGEM PRINCIPAL (Curte quantas vezes quiser)
    if (postMedia) {
        postMedia.addEventListener("click", (e) => {
            e.stopPropagation();
            if (!isLiked) {
                toggleLike();
            }
        });
    }

    // Evento no botão de SALVAR (Bookmark)
    if (bookmarkBtn) {
        let isBookmarked = false;
        bookmarkBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            isBookmarked = !isBookmarked;
            
            const bookmarkSvg = bookmarkBtn.querySelector("svg");
            if (isBookmarked) {
                bookmarkSvg.style.fill = "currentColor";
            } else {
                bookmarkSvg.style.fill = "none";
            }

            bookmarkSvg.style.transform = "scale(1.2)";
            setTimeout(() => {
                bookmarkSvg.style.transform = "scale(1)";
            }, 150);
        });
    }
});