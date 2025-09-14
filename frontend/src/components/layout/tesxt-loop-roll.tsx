import { TextRoll } from '@/components/motion-primitives/text-roll';
import { TextLoop } from '@/components/motion-primitives/text-loop';


export function TextLoopBasic() {
    return (
        <TextLoop
            className='overflow-y-clip'
            transition={{
                type: 'tween',
                stiffness: 900,
                damping: 80,
                mass: 10,
            }}
            variants={{
                initial: {
                    y: 20,
                    rotateX: 90,
                    opacity: 0,
                    filter: 'blur(4px)',
                },
                animate: {
                    y: 0,
                    rotateX: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                },
                exit: {
                    y: -20,
                    rotateX: -90,
                    opacity: 0,
                    filter: 'blur(4px)',
                },
            }}
            interval={5}
        >
            <span> <TextRoll>₿ Create funding proposals</TextRoll></span>
            <span> <TextRoll>± Vote on proposals</TextRoll></span>
            <span> <TextRoll>✇ 6-hour voting period</TextRoll></span>
            <span> <TextRoll>⦾ Only members can vote</TextRoll></span>
            <span> <TextRoll>₵ Uses C13 token</TextRoll></span>
        </TextLoop>
    );
}

