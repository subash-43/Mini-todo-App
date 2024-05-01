
export default function ListofTodo({ list }) {

    const task = list;

    /* Remove todo Function */



    return (
        <div>
            

                <li className="">
                    <strong
                        className="pr-5">
                        Title:
                    </strong>
                    {task.title}
                </li>
                <li className=" pt-3">
                    <strong
                        className="pr-5">
                        Summary:
                    </strong>
                    {task.summary}
                </li>
                <li className=" pt-3">
                    <strong className="pr-5">
                        Time:
                    </strong>
                    {
                        task.time.hour > 12 ?
                            (task.time.hour - 12) + ":" + task.time.minutes + ' ' + "PM" :
                            task.time.hour + ":" + task.time.minutes + ' ' + "AM"
                    }
                </li>

        </div>
    )
}
