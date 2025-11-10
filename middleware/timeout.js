export default function timeoutMiddleware(ms = 25000) {
  return (req, res, next) => {
    let finished = false;

    // Ako je odgovor već poslan prije timeouta, očisti timer
    const cleanup = () => {
      finished = true;
      clearTimeout(timer);
    };

    res.once("finish", cleanup); // normal end
    res.once("close", cleanup); // client closed connection

    const timer = setTimeout(() => {
      if (finished) return;
      // Ako već imamo response headers poslane, ne pokušavaj ponovno
      if (!res.headersSent) {
        res
          .status(504)
          .json({
            error: "Server timeout (internal request exceeded allowed time)",
          });
      }
      // postavi flag da ostali pokušaji da pošalju response ne uspiju
      finished = true;
    }, ms);

    next();
  };
}
