import { Container, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { NextPage } from "next";
import React from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Fade from "react-reveal/Fade";
import ContentsLayout from "../components/layouts/ContentsLayout";
import EventTab from "../components/resources/EventTab";
import { Resource } from "../interfaces";

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8)
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
        "& h2": {
            color: "#363b3f",
            textTransform: "uppercase",
            fontWeight: 700,
            fontFamily: "Lato"
        },
        "& h5": {
            fontFamily: "Lato"
        },
        "& h4": {
            color: "#ff6f6f",
            fontFamily: "Lato"
        }
    },
    section: {
        marginBottom: theme.spacing(8)
    },
    title: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        textAlign: "center",
        "& h1": {
            color: "#363b3f",
            textTransform: "uppercase",
            fontWeight: 700,
            fontFamily: "Lato"
        }
    }
}));

const resources: Resource[] = [
    {
        name: "Hour Of Code",
        title: "Hour Of Code",
        description: `The Hour of Code started as a one-hour introduction to
        computer science, designed to demystify &quot;code&quot;, to
        show that anybody can learn the basics, and to broaden
        participation in the field of computer science. It has since
        become a worldwide effort to celebrate computer science,
        starting with 1-hour coding activities but expanding to all
        sorts of community efforts.`,
        types: ["learnToCode"],
        link: "https://hourofcode.com/ca/learn",
        image: "img/resources/hour-of-code.png"
    },
    {
        name: "Codecademy",
        title: "Codecademy",
        description: `Codecademy is an American online interactive platform that
        offers free coding classes in 12 different programming
        languages including Python, Java, Go, JavaScript, Ruby, SQL,
        C++, Swift, and Sass, as well as markup languages HTML and
        CSS.`,
        types: ["learnToCode"],
        link: "https://www.codecademy.com/catalog",
        image: "img/resources/codecademy.png"
    },
    {
        name: "Khan Academy",
        title: "Khan Academy",
        description: `Khan Academy offers practice exercises, instructional
        videos, and a personalized learning dashboard that empower
        learners to study at their own pace in and outside of the
        classroom.`,
        types: ["learnToCode"],
        link: "https://www.khanacademy.org/hourofcode",
        image: "img/resources/khanacademy.jpg"
    },
    {
        name: "W3schools",
        title: "W3schools",
        description: `W3Schools is an educational website for learning web
        technologies online. Content includes tutorials and
        references relating to HTML, CSS, JavaScript, JSON, PHP,
        Python, AngularJS, React.js, SQL, Bootstrap, Sass, Node.js,
        jQuery, XQuery, AJAX, XML, Raspberry Pi, C++, C# and Java.`,
        types: ["learnToCode"],
        link: "https://www.w3schools.com/html",
        image: "img/resources/w3schools.webp"
    },
    {
        name: "Canada Learning Code",
        title: "Canada Learning Code",
        description: `At Canada Learning Code, we believe that digital
        skills are tools of empowerment. The world is
        changing, and we want Canada to be ready. We’re here
        to make sure that all people in Canada —
        particularly women, girls, people with disabilities,
        Indigenous youth, and newcomers — have access to the
        knowledge they need to prosper in our digital world.`,
        types: ["codingCamps"],
        link: "https://www.canadalearningcode.ca",
        image: "img/resources/canada-learning-code.svg"
    },
    {
        name: "Skill Crush",
        title: "Skill Crush",
        description: `We believe that technology doesn’t have to be so
        hard—and that tech is a tool that anyone can use.
        Our goal is to improve our students’ quality of life
        through digital empowerment and skills to enter
        high-earning and flexible careers. Our community of
        students, alumni, and instructors will support you
        as you go from total tech newbie to tech pro. We are
        specifically focused on getting more women, people
        of color, LGBTQ+ people, people with disabilities,
        people without college degrees, parents and
        caretakers, or people who’ve taken long breaks from
        the workforce into the tech world. If you feel like
        there’s no place for you in tech because you’ve
        never seen someone like you represented, we
        understand—and want you to know that you are so, so
        welcome here.`,
        types: ["codingCamps"],
        link: "https://learn.skillcrush.com/skillcrush-free-bootcamp",
        image: "img/resources/skillcrush_logo.png"
    },
    {
        name: "Free Code Camp",
        title: "Free Code Camp",
        description: `We’re a nonprofit community that helps you learn to
        code by building projects. freeCodeCamp is a
        non-profit organization that consists of an
        interactive learning web platform, an online
        community forum, chat rooms, online publications and
        local organizations that intend to make learning web
        development accessible to anyone.`,
        types: ["codingCamps"],
        link: "https://www.freecodecamp.org",
        image: "img/resources/FreeCodeCamp_logo.png"
    },

    {
        name: "Coursera",
        title: "Coursera",
        description: `Every course on Coursera is taught by top
        instructors from world-class universities and
        companies, so you can learn something new anytime,
        anywhere. Hundreds of free courses give you access
        to on-demand video lectures, homework exercises, and
        community discussion forums. Paid courses provide
        additional quizzes and projects as well as a
        shareable`,
        types: ["freeOnlineCourses"],
        link: "https://www.coursera.org",
        image: "img/resources/coursera.svg"
    },
    {
        name: "Edx",
        title: "Edx",
        description: `edX is the trusted platform for education and
        learning. Founded by Harvard and MIT, edX is home to
        more than 20 million learners, the majority of
        top-ranked universities in the world and
        industry-leading companies. As a global nonprofit,
        edX is transforming traditional education, removing
        the barriers of cost, location and access.
        Fulfilling the demand for people to learn on their
        own terms, edX is reimagining the possibilities of
        education, providing the highest-quality, stackable
        learning experiences including the groundbreaking
        MicroMasters® programs. Supporting learners at every
        stage, whether entering the job market, changing
        fields, seeking a promotion or exploring new
        interests, edX delivers courses for curious minds on
        topics ranging from data and computer science to
        leadership and communications. edX is where you go
        to learn.`,
        types: ["freeOnlineCourses"],
        link: "https://www.edx.org/search?search_query=coding",
        image: "img/resources/edx.png"
    },
    {
        name: "MIT OpenCourseWare",
        title: "MIT OpenCourseWare",
        description: `MIT OpenCourseWare makes the materials used in the
        teaching of almost all of MIT's subjects
        available on the Web, free of charge. With more than
        2,400 courses available, OCW is delivering on the
        promise of open sharing of knowledge.`,
        types: ["freeOnlineCourses"],
        link: "https://ocw.mit.edu/courses/intro-programming",
        image: "img/resources/ocw_mast.webp"
    },
    {
        name: "Google Web Fundamentals",
        title: "Google Web Fundamentals",
        description: `Google's opinionated reference for building
        amazing web experiences.`,
        types: ["freeOnlineCourses"],
        link: "https://developers.google.com/web/fundamentals",
        image: "img/resources/web-fundamentals.png"
    },
    {
        name: "Codewars",
        title: "Codewars",
        description: `Codewars is a collective effort by its users. They
        are creators - authoring kata to teach various
        techniques, solving kata with solutions that
        enlighten others, and commenting with constructive
        feedback. The leaders among them moderate the
        content and community.`,
        types: ["freeOnlineCourses"],
        link: "https://www.codewars.com",
        image: "img/resources/codewars.png"
    },
    {
        name: "Code Conquest",
        title: "Code Conquest",
        description: `A free online guide to coding for beginners. If
        you’re someone who wants to learn about coding, but
        you haven’t got a clue where to start, you’ve come
        to the right place. This site has all the
        step-by-step information you need to get started.
        Code Conquest is a free coding guide for beginners.
        Learn all about coding, compare and select training,
        take free tutorials and learn a ton more.`,
        types: ["freeOnlineCourses"],
        link: "https://www.codeconquest.com",
        image: "img/resources/codeconquest.webp"
    },
    {
        name: "Envato Tuts+",
        title: "Envato Tuts+",
        description: `Envato Tuts+ helps you learn creative skills and
        shape the life you want. As part of Envato’s
        creative ecosystem, Envato Tuts+ contributes to our
        mission of “helping people learn and earn online”.
        We love to see how people transform themselves and
        their lives by learning creative skills and earning
        money selling their creations or services to the
        world.`,
        types: ["freeOnlineCourses"],
        link: "https://tutsplus.com",
        image: "img/resources/tuts.svg"
    },

    {
        name: "Threejs",
        title: "Threejs",
        description: `Three.js is a cross-browser JavaScript library and
        application programming interface used to create and
        display animated 3D computer graphics in a web
        browser using WebGL.`,
        types: ["libraries"],
        link: "https://threejs.org",
        image: "img/resources/threejs.png"
    },
    {
        name: "MicroJS",
        title: "MicroJS",
        description: `Fantastic micro-frameworks and micro-libraries for
        fun and profit! - MicroJS.`,
        types: ["libraries"],
        link: "http://microjs.com",
        image: "img/resources/micro.png"
    },
    {
        name: "Riot.js",
        title: "Riot.js",
        description: `Riot.js is a simple and elegant component-based UI
        library. Riot.js lets you build user interfaces with
        custom tags using simple and enjoyable syntax.`,
        types: ["libraries"],
        link: "https://riot.js.org",
        image: "img/resources/riotjs.svg"
    },
    {
        name: "Vantajs",
        title: "Vantajs",
        description: `WebGL animated website backgrounds in a few lines of
        code.`,
        types: ["libraries"],
        link: "https://www.vantajs.com",
        image: "img/resources/vantajs.jpg"
    },
    {
        name: "Particles.js",
        title: "Particles.js",
        description: `A lightweight JavaScript library for creating
        particles.`,
        types: ["libraries"],
        link: "https://vincentgarreau.com/particles.js",
        image: "img/resources/particlesjs.png"
    },
    {
        name: "Gem.js",
        title: "Gem.js",
        description: `A view library for building and styling web
        components in pure-javascript.`,
        types: ["libraries"],
        link: "https://github.com/Tixit/gem.js",
        image: "img/resources/gem-title.png"
    },
    {
        name: "Jsblocks",
        title: "Jsblocks",
        description: `From simple user interfaces to complex single-page
        applications using faster, server-side rendered and
        easy to learn framework`,
        types: ["libraries"],
        link: "http://jsblocks.com",
        image: "img/resources/logoBeta.png"
    },

    {
        name: "Code Sandbox",
        title: "Code Sandbox",
        description: `Web Development Made Faster - An instant IDE and
        prototyping tool for rapid web development.`,
        types: ["onlineEditors"],
        link: "https://codesandbox.io",
        image: "img/resources/codesandbox.svg"
    },
    {
        name: "CODEPEN",
        title: "CODEPEN",
        description: `CodePen is an online community for testing and
        showcasing user-created HTML, CSS and JavaScript
        code snippets. It functions as an online code editor
        and open-source learning environment, where
        developers can create code snippets, called
        "pens", and test them.`,
        types: ["onlineEditors"],
        link: "https://codepen.io",
        image: "img/resources/codepen.png"
    },
    {
        name: "Snack Expo",
        title: "Snack Expo",
        description: `The fastest way to build an app. With Expo tools,
        services, and React, you can build, deploy, and
        quickly iterate on native Android, iOS, and web apps
        from the same JavaScript codebase. Snack allows you
        to run code in the browser in a matter of seconds.
        No downloads required.`,
        types: ["onlineEditors"],
        link: "https://snack.expo.io",
        image: "img/resources/snack.svg"
    },
    {
        name: "Jsfiddle",
        title: "Jsfiddle",
        description: `JSFiddle is an online IDE service and online
        community for testing and showcasing user-created
        and collaborational HTML, CSS and JavaScript code
        snippets, known as 'fiddles'. It allows
        for simulated AJAX calls.`,
        types: ["onlineEditors"],
        link: "https://jsfiddle.net",
        image: "img/resources/Jsfiddle-logo.png"
    },

    {
        name: "Jump Portal",
        title: "Jump Portal",
        description: ``,
        types: ["uofmResources"],
        link: "https://jump.portal.umanitoba.ca",
        image: ""
    },
    {
        name: "Career Connect",
        title: "Career Connect",
        description: ``,
        types: ["uofmResources"],
        link: "https://www.uofmcareerservices.ca",
        image: ""
    },
    {
        name: "Resume Help",
        title: "Resume Help",
        description: ``,
        types: ["uofmResources"],
        link: "http://umanitoba.ca/student/careerservices/media/Resume.pdf",
        image: ""
    },
    {
        name: "Cover Letter Help",
        title: "Cover Letter Help",
        description: ``,
        types: ["uofmResources"],
        link: "http://umanitoba.ca/student/careerservices/media/CoverLetter.pdf",
        image: ""
    },
    {
        name: "Find other student clubs",
        title: "Find other student clubs",
        description: ``,
        types: ["uofmResources"],
        link: "https://umsu.ca/student-clubs-associations/student-clubs",
        image: ""
    }
];

const Resources: NextPage = () => {
    const classes = useStyles();

    return (
        <ContentsLayout title="Resources">
            <Container component="main">
                <Fade bottom duration={1000} delay={100} distance="30px">
                    <div className={classes.heroContent}>
                        <Container maxWidth="sm">
                            <Typography
                                component="h2"
                                variant="h2"
                                align="center"
                                color="textPrimary"
                                gutterBottom
                            >
                                Resources
                            </Typography>
                            <Typography
                                component="h5"
                                variant="h5"
                                align="center"
                                color="textSecondary"
                                paragraph
                            >
                                Discover more resources!
                            </Typography>
                        </Container>
                    </div>
                </Fade>
                <Fade bottom duration={1000} delay={300} distance="30px">
                    <EventTab resources={resources} />
                </Fade>
            </Container>
        </ContentsLayout>
    );
};

export default Resources;
