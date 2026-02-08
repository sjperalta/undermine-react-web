# 🎯 Product Brief: Daily Fantas(Soccer) MVP

## **Product Vision**
A web-based daily fantasy sports platform exclusively for soccer, where users can participate in short-term fantasy contests by building virtual teams of real players and competing based on real-world match performance.

## **Core Value Proposition**
- **For Users**: Accessible fantasy soccer contests with immediate results (daily/weekly)
- **For Platform**: Engagement through competition, skill-based gameplay, and community rankings

---

## **🎮 User Experience Flow**

### **Player Journey (End-to-End)**
1. **Registration** → Quick sign-up with email
2. **Browse** → View available soccer contests
3. **Join** → Enter a contest (free entry for MVP)
4. **Build** → Create lineup within constraints
5. **Wait** → Real matches are played
6. **Results** → View final standings after scoring
7. **Repeat** → Join new contests

### **Admin/Operator Journey**
1. **Setup** → Create contest, import player/match data
2. **Manage** → Open/lock contests at appropriate times
3. **Input** → Enter match statistics after games
4. **Process** → Trigger scoring calculations
5. **Finalize** → Close contest and display results

---

## **⚙️ System Components & Interactions**

### **A. User-Facing Modules**
#### **1. Contest Discovery & Entry**
- **Purpose**: Allow users to find and join fantasy contests
- **Key Decisions**: Which contest to join based on timing, entry requirements
- **User Action**: Browse → Select → Confirm Entry

#### **2. Team Building (Core Gameplay)**
- **Purpose**: Strategic selection of players within constraints
- **Game Mechanics**:
  - **Resource Management**: Limited salary cap
  - **Composition Rules**: Positional requirements (1GK, 3-5DEF, 3-5MID, 1-3FWD)
  - **Strategic Constraints**: Team diversity (optional)
- **User Mindset**: "How do I optimize my limited budget for maximum potential points?"

#### **3. Results & Competition**
- **Purpose**: Show outcomes and relative performance
- **Psychological Elements**: 
  - Rank comparison
  - Performance validation
  - Motivation for future participation

### **B. Administrative Modules**
#### **1. Contest Configuration**
- **Purpose**: Define the "game rules" for each contest
- **Parameters**: Timing, entry limits, scoring rules, player pool

#### **2. Data Management**
- **Purpose**: Provide real-world context (players, matches, stats)
- **Sources**: Manual entry or CSV imports
- **Critical Timing**: Must be complete before contest starts

#### **3. Scoring Engine**
- **Purpose**: Translate real-world events into fantasy points
- **Process**: Stat input → Point calculation → Leaderboard update
- **Transparency**: Users must understand how their score was calculated

---

## **📊 Data Model Relationships**

```
USER ──┬── ENTERS ──► CONTEST
       └── CREATES ─► LINEUP ── CONTAINS ──► PLAYERS
                                         │
                                    (real-world stats)
                                         ▼
                                    MATCH PERFORMANCE
                                         │
                                         ▼
                                    FANTASY POINTS
```

**Key Relationships**:
- One contest has many lineups
- One lineup has exactly 11 players
- One player has performance across multiple matches
- Player performance generates fantasy points
- Lineup points = sum of player points

---

## **⏱️ Temporal Dynamics**

### **Contest Lifecycle Timeline**
```
┌─────────┐     ┌──────┐     ┌─────────┐     ┌──────────┐
│  Draft  │────►│ Open │────►│ Locked  │────►│ Completed│
└─────────┘     └──────┘     └─────────┘     └──────────┘
  Admin-created   Joinable    Lineups fixed   Scored & ranked
```

### **Critical Timing Events**
1. **Pre-Contest**: Player data loaded, contests created
2. **Entry Period**: Users join and build lineups
3. **Lock Time**: Lineups become immutable (match start)
4. **Post-Match**: Stats collected, scores calculated
5. **Finalization**: Results published

---

## **🎯 User Psychology & Engagement Hooks**

### **Primary Motivations**
- **Competition**: Beat other players, climb leaderboards
- **Mastery**: Improve lineup-building skills over time
- **Ownership**: "My team" identification with selected players
- **Anticipation**: Watching real matches with personal stake

### **MVP-Specific Psychology**
- **Low Barrier**: Free entry removes financial risk
- **Quick Feedback**: Daily/weekly contests provide rapid results
- **Skill Expression**: Knowledge of soccer rewarded through lineup choices

---

## **🔐 Critical Business Rules**

### **Inviolable Constraints**
1. **Lineup Validation Rules** (cannot be bypassed):
   - Salary cap limit
   - Position requirements
   - Unique players only
   - Submission before lock time

2. **Scoring Integrity**:
   - Consistent point calculation for all users
   - Transparent scoring methodology
   - Final results immutable once published

3. **Contest Fairness**:
   - Equal access to player pool for all entrants
   - Consistent rules application
   - Clear timeline communication

### **Configurable Elements** (Admin-controlled):
- Salary cap values
- Position distribution rules
- Scoring point values
- Contest timing and duration

---

## **🚫 Edge Cases & Considerations**

### **Data Issues**
- Missing player stats after matches
- Players not starting (in lineup but zero minutes)
- Match postponements after contest lock
- Data entry errors in statistics

### **User Behavior**
- Last-minute lineup changes
- Multiple entries in same contest
- Attempting to join after lock time
- Abandoned lineups (joined but never built team)

### **System Scenarios**
- Admin forgetting to finalize contest
- Incorrect player salaries or positions
- Conflicting statistics from different sources
- Timezone handling for international users

---

## **🎨 Experience Principles**

### **For Users:**
- **Clarity Over Complexity**: Simple rules, clear scoring
- **Transparency**: Understand why they won/lost
- **Progressive Engagement**: Easy first experience, depth available

### **For Admins:**
- **Control With Guardrails**: Flexible but safe configuration
- **Efficiency**: Batch operations where possible
- **Error Prevention**: Validate before committing changes

---

## **📈 Success Metrics (MVP Focus)**

### **User Engagement Metrics**
- Registration completion rate
- Contest entry rate (join after viewing)
- Lineup completion rate (build after joining)
- Return rate (users playing multiple contests)

### **System Health Metrics**
- Data import success rate
- Scoring calculation accuracy
- Contest finalization timeliness

### **Quality Metrics**
- User comprehension of rules (survey)
- Error rate in lineup submission
- Support inquiries per contest

---

## **🧩 Integration Points & Dependencies**

### **External Dependencies (MVP)**
- **Data Sources**: Manual entry (admin) or CSV import
- **Timing Source**: System clock for contest lock times
- **Calculation Engine**: Server-side or client-side scoring

### **Internal Dependencies**
1. Player data → Required for lineup builder
2. Match schedule → Required for contest timing
3. Statistics → Required for scoring
4. User accounts → Required for participation

**Order of Operations**: Data must flow through system in correct sequence:
```
Teams/Players → Matches → Contests → Lineups → Stats → Scores → Results
```

---

## **🔮 Evolution Considerations**

### **Designed for Extension**
- **Scoring System**: Plug-in architecture for different point systems
- **Sport Framework**: Soccer-specific but separable from core contest engine
- **Admin Tools**: Basic MVP functions with expansion capability

### **Technical Debt Decisions**
- **Accepted**: Manual processes for data entry
- **Accepted**: Simple scoring without real-time updates
- **Avoided**: Hard-coded sport-specific logic in core contest flow

---

## **🎯 MVP Completion Criteria**

The product is "MVP complete" when:

**User Can:**
1. Discover and enter a soccer fantasy contest
2. Build a valid lineup meeting all constraints
3. View final results after match completion

**Admin Can:**
1. Create and configure a contest
2. Import necessary player/match data
3. Input statistics and trigger scoring
4. Finalize and publish contest results

**System Does:**
1. Enforce all lineup rules consistently
2. Calculate scores accurately per defined rules
3. Rank users correctly based on performance
4. Maintain data integrity throughout lifecycle

---

**Final Note to Lovely**: This is a **fantasy sports platform** with **game mechanics** at its core. The experience revolves around **strategic team building**, **competition**, and **performance-based scoring**. Focus on creating an intuitive flow from contest discovery → team creation → results viewing, while ensuring the administrative backend allows for smooth contest operations. The joy comes from the combination of sports knowledge, strategic decision-making, and competitive outcomes.

