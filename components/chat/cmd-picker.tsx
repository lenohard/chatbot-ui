import { ChatbotUIContext } from "@/context/context"
import { Tables } from "@/supabase/types"
import { IconRobotFace } from "@tabler/icons-react"
import Image from "next/image"
import { FC, useContext, useEffect, useRef } from "react"
import { usePromptAndCommand } from "./chat-hooks/use-prompt-and-command"

interface CmdPickerProps {}

export const CmdPicker: FC<CmdPickerProps> = ({}) => {
    const {
        focusCmd,
        cmdCommand,
        isCmdPickerOpen,
        setIsCmdPickerOpen
    } = useContext(ChatbotUIContext)

    interface Command {
        name: string;
        description: string;
    }

    const {handleSelectCmd} = usePromptAndCommand()
    const cmds: Command[] = [
        {
            "name": 'new chat',
            "description": "Start a new chat with a user."
        },
        {
            "name": "copy chat history",
            "description": "Copy the entrie chat history of the current chat in format of plain text"
        }
    ]

    const itemsRef = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        if (focusCmd && itemsRef.current[0]) {
            itemsRef.current[0].focus()
        }
    }, [focusCmd])

    const filteredCmds = cmds.filter(cmd =>
        cmd.name.toLowerCase().includes(cmdCommand.toLowerCase())
    )

    const handleOpenChange = (isOpen: boolean) => {
        setIsCmdPickerOpen(isOpen)
    }

    const callSelectCmd = (cmd: Command) => {
        handleSelectCmd(cmd)
        handleOpenChange(false)
    }

    const getKeyDownHandler =
        (index: number) => (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Backspace") {
                e.preventDefault()
                handleOpenChange(false)
            } else if (e.key === "Enter") {
                e.preventDefault()
                callSelectCmd(filteredCmds[index])
            } else if (
                (e.key === "Tab" || e.key === "ArrowDown") &&
                !e.shiftKey &&
                index === filteredCmds.length - 1
            ) {
                e.preventDefault()
                itemsRef.current[0]?.focus()
            } else if (e.key === "ArrowUp" && !e.shiftKey && index === 0) {
                // go to last element if arrow up is pressed on first element
                e.preventDefault()
                itemsRef.current[itemsRef.current.length - 1]?.focus()
            } else if (e.key === "ArrowUp") {
                e.preventDefault()
                const prevIndex =
                    index - 1 >= 0 ? index - 1 : itemsRef.current.length - 1
                itemsRef.current[prevIndex]?.focus()
            } else if (e.key === "ArrowDown") {
                e.preventDefault()
                const nextIndex = index + 1 < itemsRef.current.length ? index + 1 : 0
                itemsRef.current[nextIndex]?.focus()
            }
        }

    return (
        <>
            {isCmdPickerOpen && (
                <div className="bg-background flex flex-col space-y-1 rounded-xl border-2 p-2 text-sm">
                    {filteredCmds.length === 0 ? (
                        <div className="text-md flex h-14 cursor-pointer items-center justify-center italic hover:opacity-50">
                            No matching assistants.
                        </div>
                    ) : (
                        <>
                            {filteredCmds.map((item, index) => (
                                <div
                                    key={item.name}
                                    ref={ref => {
                                        itemsRef.current[index] = ref
                                    }}
                                    tabIndex={0}
                                    className="hover:bg-accent focus:bg-accent flex cursor-pointer items-center rounded p-2 focus:outline-none"
                                    onClick={() =>
                                        callSelectCmd(item as Tables<"assistants">)
                                    }
                                    onKeyDown={getKeyDownHandler(index)}
                                >
                                    {/* {item.image_path ? ( */}
                                    {/*   <Image */}
                                    {/*     src={ */}
                                    {/*       assistantImages.find( */}
                                    {/*         image => image.path === item.image_path */}
                                    {/*       )?.url || "" */}
                                    {/*     } */}
                                    {/*     alt={item.name} */}
                                    {/*     width={32} */}
                                    {/*     height={32} */}
                                    {/*     className="rounded" */}
                                    {/*   /> */}
                                    {/* ) : ( */}
                                    {/*   <IconRobotFace size={32} /> */}
                                    {/* )} */}

                                    <div className="ml-3 flex flex-col">
                                        <div className="font-bold">{item.name}</div>

                                        <div className="truncate text-sm opacity-80">
                                            {item.description || "No description."}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            )}
        </>
    )
}
