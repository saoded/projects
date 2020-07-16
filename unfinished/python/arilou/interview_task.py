import numpy as np
from datetime import datetime, timedelta
from pause import until
from random import randrange, choice, randint
from itertools import compress
import can_module
import threading
import queue
from time import sleep

# GENERATOR UNIT
generator_queue = queue.Queue()


def generator_func(endtime=datetime.now()+timedelta(seconds=2)):
    while(datetime.now() < endtime):
        generator_queue.put(can_module.generate_can_frame())


# DETECTOR UNIT
detector_queue = queue.Queue()
SLEEP_DELTA = 0.002  # seconds


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
    runtime = timedelta(seconds=2)
    endtime = datetime.now() + runtime

    generator = threading.Thread(target=generator_func, args=(endtime,))
    detector = threading.Thread(target=detector_func, args=(endtime,))
    reporter = threading.Thread(target=reporter_func, args=(endtime,))

    generator.start()
    detector.start()
    reporter.start()

    generator.join()
    detector.join()
    reporter.join()
# print(FRAME_GEN_TIMES)
