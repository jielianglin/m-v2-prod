import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";


export default function About() {
  return (
    <div>

      <p className="team">

        <Typography variant="h5">
          <span className="About">
            MIGR-AI-TION is a speculative platform to re-conceive current technological processes and futures. We use healing methodologies from Expressive-Arts Therapy and design fiction to address AI labour,
            data extraction, and inequalities that are inherent and (in)visible in the tech world. We convene artistic, ethnographic, therapeutic and design perspectives in order to do so, and our applied,
            interventional approaches carve out communal practices for intercultural well-being in digital-embodied-entangled realms. Digital practices include using archiving, witnessing and imagining as methods for
            community development and decolonising technology, for which, this platform is a tool.
            <br />
            This project was created to inspire grassroots modes of data activism and participation in everyday users. Not only do we want to counter the hegemonic media narratives about migrants, migration and (post)colonial societies,
            we also want to develop new models of interconnectivity and for sharing oneself and one’s data. For our team, this means going beyond superficial tropes of “diversity”, and delving deeper into inquiries of what knowledge is,
            how it is created and who it serves. We want to collect a decolonised image dataset, and to use the collection process itself as a way to strengthen individuals and communities.
            <br />
            The liminal character of migration experiences presents a challenge to the concretizing influence of image recognition technologies upon visual culture and our perceptual modes of thinking and being.
            Humans with migration backgrounds are our inspiration for re-centering the unquantifiable character of primary experience in a data-driven world. Together, we push for more inclusive approaches to AI-oriented research,
            businesses, policies and beyond.

          </span>
          <span className="teammates-names" style={{ fontWeight: "bold" }}> Jie Liang Lin (Project Lead & Developer)</span>
          <br />
          <span className="description">
            is a Chinese-American, interdisciplinary artist and media
            anthropologist based in Berlin. Her work focuses on the
            intersections of new technologies and migration phenomena, and the
            mediation of migration experiences. She is responsible for the
            project idea and web development for this project.
          </span>
          <br />
          <br />

          <span>RESEARCH TEAM</span>
          <br />
          <span className="teammates-names" style={{ fontWeight: "bold" }}>Nuno Moreira (UX Research) </span>
          <br />
          <span className="description">
            is a Portuguese architect based in Berlin interested in bringing the
            Human-Centered Design approach to the Digital World. He is
            responsible for the User Experience and the Interface Design for
            this project.
          </span>
          <br />
          <br />
          <span className="teammates-names" style={{ fontWeight: "bold" }}>Yasaman Pischvaei (Methodology)</span>
          <br />
          <span className="description">
            is a multidisciplinary Iranian artist and Expressive Arts therapist based in Potsdam, Germany.
            Her art-based research is focused on investigating new forms of interconnection and belonging
            at the bridges of the online and offline worlds by utilizing the transformational and curative
            powers of art and art processes. She is in charge of the research design for this project,
            connecting digital and analog processes.
          </span>
          <br />
          <br />
          <span className="teammates-names" style={{ fontWeight: "bold" }}>Florencia Beatriz Turiace (Migration Lead)</span>
          <br />
          <span>
            is a Berlin-based Argentinian professional dancer, choreographer and dance teacher certified
            in Expressive Arts therapy. The main focus of her research is migration, diversity and integration.
            She believes that positive social changes occur while strengthening human connection without denying
            personal uniqueness. Since 2020 she has facilitated dance- therapy workshops for migrant female,
            trans female and non binary people, delving into deeper themes and commonalities amongst
            participants.
          </span>
          <br />
          <br />
          <span className="description">
            <i>Phase 1 of this project was developed in the context of Techlabs Berlin.
              Phase 2 is supported by Prototype Fund, Round 9 (Open Knowledge Foundation Germany and the Federal Ministry of Education and Research (BMBF))</i>
          </span>
        </Typography>
      </p>
    </div>
  );
}