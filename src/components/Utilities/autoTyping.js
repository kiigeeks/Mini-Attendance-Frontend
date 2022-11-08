
import ReactTypingEffect from 'react-typing-effect';

const AutoTyping = ({ textTyping }) => {
    return (
        <ReactTypingEffect
            text={textTyping}
            speed={100}
            eraseDelay={800}
            eraseSpeed={100}
            typingDelay={100}
        />
    )
}

export default AutoTyping