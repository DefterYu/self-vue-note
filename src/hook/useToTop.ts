const useToTop = () => {
    //返回顶部
    const toTop = () => {
        let html = document.documentElement;
        var timer = setInterval(() => {
            if (html.scrollTop <= 0) {
                clearInterval(timer);
            }
            html.scrollTop = html.scrollTop - 20;
        }, 10);
    };
    return {
        toTop
    };
};
export default useToTop;
