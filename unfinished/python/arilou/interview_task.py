import can_module
from datetime import datetime, timedelta
from time import sleep
import threading
import queue

# CONSTANTS
SLEEP_DELTA = 0.002  # seconds
RUNTIME = 2  # seconds

# MESSAGE QUEUES
generator_queue = queue.Queue()
detector_queue = queue.Queue()


# GENERATOR UNIT
def generator_func(endtime=datetime.now()+timedelta(seconds=2)):
    while(datetime.now() < endtime):
        generator_queue.put(can_module.generate_can_frame())


# DETECTOR UNIT
def detector_func(endtime=datetime.now()+timedelta(seconds=2)):
    while(datetime.now() < endtime):
        while(not generator_queue.qsize()):
            sleep(SLEEP_DELTA)
        detector_queue.put(can_module.detect_can_frame(generator_queue.get()))


# REPORTER UNIT
def reporter_func(endtime=datetime.now()+timedelta(seconds=2)):
    # OPEN FILE FOR WRITING
    fobj = open("report", "w")
    # RUN THREADLOOP
    while(datetime.now() < endtime):
        while(not detector_queue.qsize()):
            sleep(SLEEP_DELTA)
        report_str = can_module.report(detector_queue.get())
        # APPEND TO FILE
        fobj.write(report_str)
        # print(report_str)
    # CLOSE FILE
    fobj.close()


if __name__ == "__main__":
    runtime = timedelta(seconds=RUNTIME)
    endtime = datetime.now() + runtime

    # CREATE THREADS
    generator = threading.Thread(target=generator_func, args=(endtime,))
    detector = threading.Thread(target=detector_func, args=(endtime,))
    reporter = threading.Thread(target=reporter_func, args=(endtime,))

    # START THREADS
    generator.start()
    detector.start()
    reporter.start()

    # WAIT FOR THREADS TO FINISH
    generator.join()
    detector.join()
    reporter.join()
    
    # print(list(can_module.FRAME_META.keys()))
